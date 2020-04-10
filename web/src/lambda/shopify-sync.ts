import { APIGatewayEvent } from 'aws-lambda'
import sanityClient from '@sanity/client'

const {
  statusReturn,
  SANITY_API_TOKEN,
  SANITY_PROJECT_ID,
  SANITY_DATASET,
} = process.env;

const client = sanityClient({
  projectId: SANITY_PROJECT_ID,
  dataset: SANITY_DATASET,
  token: SANITY_API_TOKEN,
  useCdn: false
});

export const handler = async (event: APIGatewayEvent): Promise<any> => {
  if (event.httpMethod !== 'POST' || !event.body) {
    return statusReturn(400, '')
  }

  let data;
  let hasVariantsToSync = false;

  try {
    data = JSON.parse(event.body);
  } catch (error) {
    console.error('JSON parsing error:', error);
    return statusReturn(400, { error: 'Bad request body' })
  }

  // Shopify sends both Product Updates/Creations AND deletions as POST requests
  // Product Updates & Creations contain the entire product body, including titles, tags, images, handle, etc.
  // Product Deletions only contain a singular 'id'
  if (data.hasOwnProperty('title') && data.hasOwnProperty('handle')) {
    // Build our initial product
    const product = {
      _type: 'product',
      _id: data.id.toString()
    }

    /*
    /    Because of the nested structure of the products (with tabs)
    /    we need select the fields we want to update specifically in Shopify
    /    Syncs to prevent erasing other modular/custom data
    */
   const productObject = {
    "content.shopify.productId": data.id,
    "content.shopify.title": data.title,
    "content.shopify.defaultPrice": data.variants[0].price,
    "content.shopify.defaultVariant.title": data.variants[0].title,
    "content.shopify.defaultVariant.price": data.variants[0].price,
    "content.shopify.defaultVariant.sku": data.variants[0].sku,
    "content.shopify.defaultVariant.variantId": data.variants[0].id,
    "content.shopify.defaultVariant.taxable": data.variants[0].taxable,
    "content.shopify.defaultVariant.inventoryQuantity": data.variants[0].inventory_quantity,
    "content.shopify.defaultVariant.inventoryPolicy": data.variants[0].inventory_policy,
    "content.shopify.defaultVariant.barcode": data.variants[0].barcode,
    "content.main.title": data.title,
    "content.main.slug.current": data.handle
  }

    return client
      .transaction()
      .createIfNotExists(product)
      .patch(data.id.toString(), patch => patch.set(productObject))
      .commit()
      .then(res => {
        console.log(`Successfully updated/patched Product ${data.id} in Sanity`);

        if (data.variants.length > 1) {
          hasVariantsToSync = true;

          return Promise.all(data.variants.map(variant => {
            const variantData = {
              _type: 'productVariant',
              _id: variant.id.toString(),
              content: {
                main: {
                  title: data.title,
                },
                shopify: {
                  productId: data.id,
                  variantId: variant.id,
                  title: data.title,
                  variantTitle: variant.title,
                  sku: variant.sku,
                  price: variant.price
                }
              }
            };

            return client
              .transaction()
              .createIfNotExists(variantData)
              .patch(variant.id.toString(), patch => patch.set(variantData))
              .commit()
              .then(response => {
                console.log(`Successfully updated/patched Variant ${variant.id} in Sanity`);
                return response;
              })
              .catch(error => {
                console.error('Sanity error:', error);
                return error;
              });
          })).then(result => {
            if (hasVariantsToSync) {
              return client
                .transaction()
                .createIfNotExists(product)
                .patch(data.id.toString(), patch => patch.set({
                  "content.shopify.variants": data.variants.map(variant => ({
                    _type: 'reference',
                    _ref: variant.id.toString(),
                    _key: variant.id.toString(),
                  }))
                }))
                .commit()
                .then(response => {
                  console.log(`Successfully added variant references to ${data.id} in Sanity`);
                  return statusReturn(200, { response })
                })
                .catch(error => {
                  console.error('Sanity error:', error);
                  return error;
                });
            } else {
              return statusReturn(200, { res })
            }
          }).catch(error => {
            console.error('Sanity error:', error);
            return statusReturn(500, { error: 'An internal server error has occurred' })
          });

        } else {
          return statusReturn(200, { res })
        }
      })
      .catch(error => {
        console.error('Sanity error:', error);
        return statusReturn(500, { error: 'An internal server error has occurred' })
      });
  } else if (data.hasOwnProperty('id') && (!data.hasOwnProperty('title') && !data.hasOwnProperty('handle'))) {
    // this is triggered if Shopify sends a Product Deletion webhook that does NOT contain anything besides an ID

    // sets the "deleted" boolean to true
    // you could likely use this value in Gatsby to decide whether to render the item or not

    // tread carefully: 
    return client
      .patch(data.id.toString())
      .set({ 'content.shopify.deleted': true })
      .commit()
      .then(deletedObject => {
        console.log(`successfully marked ${data.id} as 'deleted'`)
      })
      .catch(error => {
        console.error(`Sanity error:`, error)
        return statusReturn(500, { error: error[0].message })
      })

    // *~* OR *~*

    // DELETE FROM SANITY
    // tread carefully here: you might not want to do this if you have products associated anywhere else such as "related products" or any other schemas. 
    // this will likely cause in your schemas breaking
    //   return client
    //     .delete(data.id.toString())
    //     .then(res => {
    //       console.log(`Successfully deleted product ${data.id}`)
    //     })
    //     .catch(err => {
    //       console.error('Delete failed: ', err.message)
    //     })


  }
};