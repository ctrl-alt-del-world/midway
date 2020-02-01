const sanityClient = require('@sanity/client');

const {
  REACT_APP_SANITY_API_TOKEN,
  REACT_APP_SANITY_PROJECT_ID,
  REACT_APP_SANITY_DATASET,
} = process.env;

const client = sanityClient({
  projectId: REACT_APP_SANITY_PROJECT_ID,
  dataset: REACT_APP_SANITY_DATASET,
  token: REACT_APP_SANITY_API_TOKEN,
  useCdn: true
});

exports.handler = async (event, context) => {
  if (event.httpMethod !== 'POST' || !event.body) {
    return {
      statusCode: 400,
      body: ''
    };
  }

  let data;
  let hasVariantsToSync = false;

  try {
    data = JSON.parse(event.body);
  } catch (error) {
    console.error('JSON parsing error:', error);

    return {
      statusCode: 400,
      body: JSON.stringify({
        error: 'Bad request body'
      })
    };
  }

  // Shopify sends both Product Updates/Creations AND deletions as POST requests
  // Product Updates & Creations contain the entire product body, including titles, tags, images, handle, etc.
  // Product Deletions only contain a singular 'id'
  if (data.hasOwnProperty('title') && data.hasOwnProperty('handle')) {
    // Build our initial product
    const product = {
      _type: 'product',
      _id: data.id.toString(),
      productId: data.id,
      title: data.title,
      defaultPrice: data.variants[0].price,
      slug: {
        _type: 'slug',
        current: data.handle
      }
    };

    return client
      .transaction()
      .createIfNotExists(product)
      .patch(data.id.toString(), patch => patch.set(product))
      .commit()
      .then(res => {
        console.log(`Successfully updated/patched Product ${data.id} in Sanity`);

        if (data.variants.length > 1) {
          hasVariantsToSync = true;

          return Promise.all(data.variants.map(variant => {
            const variantData = {
              _type: 'productVariant',
              _id: variant.id.toString(),
              productId: data.id,
              variantId: variant.id,
              title: data.title,
              variantTitle: variant.title,
              sku: variant.sku,
              price: variant.price
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
                  variants: data.variants.map(variant => ({
                    _type: 'reference',
                    _ref: variant.id.toString(),
                    _key: variant.id.toString(),
                  }))
                }))
                .commit()
                .then(response => {
                  console.log(`Successfully added variant references to ${data.id} in Sanity`);
                  return {
                    statusCode: 200,
                    body: JSON.stringify(response)
                  };
                })
                .catch(error => {
                  console.error('Sanity error:', error);
                  return error;
                });
            } else {
              return {
                statusCode: 200,
                body: JSON.stringify(res)
              };
            }
          }).catch(error => {
            console.error('Sanity error:', error);

            return {
              statusCode: 500,
              body: JSON.stringify({
                error: 'An internal server error has occurred',
              })
            };
          });

        } else {
          return {
            statusCode: 200,
            body: JSON.stringify(res)
          };
        }
      })
      .catch(error => {
        console.error('Sanity error:', error);

        return {
          statusCode: 500,
          body: JSON.stringify({
            error: 'An internal server error has occurred',
          })
        };
      });
  } else if (data.hasOwnProperty('id') && (!data.hasOwnProperty('title') && !data.hasOwnProperty('handle'))) {
    // this is triggered if Shopify sends a Product Deletion webhook that does NOT contain anything besides an ID
  
    // sets the "deleted" boolean to true
    // you could likely use this value in Gatsby to decide whether to render the item or not

    // tread carefully: 
    return client
      .patch(data.id.toString())
      .set({ deleted: true })
      .commit()
      .then(deletedObject => {
        console.log(`successfully marked ${data.id} as 'deleted'`)
      })
      .catch(error => {
        console.error(`Sanity error:`, error)
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