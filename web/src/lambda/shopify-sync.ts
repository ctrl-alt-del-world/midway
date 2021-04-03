require("dotenv").config();
import { APIGatewayEvent } from 'aws-lambda'
import axios from 'axios'
import sanityClient from '@sanity/client'
import crypto from 'crypto'
import _ from 'lodash'

const jsondiffpatch =  require('jsondiffpatch')

import fetch from 'node-fetch'

const {
  SANITY_API_TOKEN,
  SANITY_PROJECT_ID,
  SANITY_DATASET,
  SHOPIFY_API_PASSWORD,
  SHOPIFY_API_KEY,
  SHOPIFY_URL,
  SHOPIFY_WEBHOOK_SECRET
} = process.env;

const client = sanityClient({
  projectId: SANITY_PROJECT_ID,
  dataset: SANITY_DATASET,
  token: SANITY_API_TOKEN,
  useCdn: false
});

import {
  statusReturn,
  preparePayload,
  shopifyConfig,
  PRODUCT_QUERY,
  PRODUCT_UPDATE
} from './requestConfig'

const updateEverything = async (data: {
  id: number
  title: string
  variants: any[]
  handle: string
}, inputObject) => {
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

  const metaPayLoad = preparePayload(PRODUCT_UPDATE, inputObject)
          
  const updateMetaField = await axios({
    url: `https://${SHOPIFY_API_KEY}:${SHOPIFY_API_PASSWORD}@${SHOPIFY_URL}/admin/api/2020-10/graphql.json`,
    method: 'POST',
    headers: shopifyConfig,
    data: metaPayLoad
  })

  try {

    let tx = client.transaction()

    //
    // === Patch Product ===
    //

    tx = tx.createIfNotExists(product)
    tx = tx.patch(data.id.toString(), patch => patch.set(productObject))
    console.log(`Successfully updated/patched Product ${data.id} in Sanity`);

    //
    // === Patch Product Image
    //

    const shopifyImage = data.image ? data.image.src : null

    try {
      if (shopifyImage) {
        await fetch(shopifyImage)
          .then(res => res.buffer())
          .then(buffer => client.assets.upload('image', buffer))
          .then(assetDocument => {
            const productImageObject = {
              "content.shopify.image": {
                _type: "image",
                asset: {
                  _ref: assetDocument._id,
                  _type: "reference"

                }
              }
            }
            tx = tx.patch(data.id.toString(), patch => patch.set(productImageObject))

            console.log(`patching image ${data.id} in Sanity`);
          })
      }
    } catch(e) {
      console.log(e)
    }

    //
    // === Patch Variants ===
    //

    const productVariants = data.variants.map(variant => ({
      _type: 'productVariant',
      _id: variant.id.toString()
    }))

    const productVariantSchema = data.variants.map(variant => ({
      "content.main.title": data.title,
      "content.shopify.productId": data.id,
      "content.shopify.variantId": variant.id,
      "content.shopify.title": data.title,
      "content.shopify.variantTitle": variant.title,
      "content.shopify.sku": variant.sku,
      "content.shopify.price": variant.price
    }))

    // Create Variant
    productVariants.forEach((variant, i) => {
      tx = tx.createIfNotExists(variant);
      tx = tx.patch(variant._id, p => p.set(productVariantSchema[i]));
    })

    console.log(`Updating/patching Variants ${data.variants.map(v => v.id).join(', ')} in Sanity`);

    //
    // === Include variants on product document ===
    //

    tx = tx.patch(data.id.toString(), p => p.set({
      "content.shopify.variants": data.variants.map(variant => ({
        _type: 'reference',
        _ref: variant.id.toString(),
        _key: variant.id.toString(),
      }))
    }))

    console.log(`Adding variant references to ${data.id} in Sanity`);

    const result = await tx.commit()

    return statusReturn(200, { body: JSON.stringify(result) })


  } catch (error) {
    console.log('this is an error', error);

    return {
      statusCode: 500,
      body: JSON.stringify({
        error: 'An internal server error has occured',
      })
    };
  }
}

export const handler = async (event: APIGatewayEvent): Promise<any> => {
  if (event.httpMethod !== 'POST' || !event.body) {
    return statusReturn(400, '')
  }

  let data
  const hmac = event.headers['x-shopify-hmac-sha256']

  try {
    data = JSON.parse(event.body);
    const generatedHash = crypto
      .createHmac('sha256', SHOPIFY_WEBHOOK_SECRET)
      .update(event.body)
      .digest('base64')
    if (generatedHash !== hmac) {
      return statusReturn(400, { error: 'Invalid Webhook' })
    }
  } catch (error) {
    console.error('JSON parsing error:', error);
    return statusReturn(400, { error: 'Bad request body' })
  }

  // Shopify sends both Product Updates/Creations AND deletions as POST requests
  // Product Updates & Creations contain the entire product body, including titles, tags, images, handle, etc.
  // Product Deletions only contain a singular 'id'
  if (data.hasOwnProperty('title') && data.hasOwnProperty('handle')) {
    // Build our initial product

    const payload = preparePayload(PRODUCT_QUERY, {
      id: data.admin_graphql_api_id
    })
    
    try {
      const shopifyProduct = await axios({
        url: `https://${SHOPIFY_API_KEY}:${SHOPIFY_API_PASSWORD}@${SHOPIFY_URL}/admin/api/2020-10/graphql.json`,
        method: 'POST',
        headers: shopifyConfig,
        data: payload
      })

      const {
        metafield,
        title,
        id,
        handle,
        totalVariants,
        images,
        variants
      } = shopifyProduct.data.data.node

      const metaCompare = {
        id,
        title,
        handle,
        totalVariants,
        images,
        variants
      }
      const inputObject = {
        input: {
          "id": data.admin_graphql_api_id,
          "metafields": [
            {
              id: metafield ? metafield.id : null,
              "namespace": "sync",
              "key": "productData",
              "value": JSON.stringify(metaCompare),
              "valueType": "STRING"
            }
          ]
        }
      }
      if (metafield) {
         if (jsondiffpatch.diff(JSON.parse(metafield.value), metaCompare)) {
            try {
              return updateEverything(data, inputObject)
            } catch (err) {
              return statusReturn(200, { error: 'Problem with mutation' })
            }
         } else {
          return statusReturn(200, { body: 'nothing important changed' })
         }
      } else {
        try {

          return updateEverything(data, inputObject)
        } catch (err) {
          return statusReturn(200, { error: 'Problem with mutation' })
        }
      }
    } catch (err) {
      console.log(err)
      return statusReturn(200, { error: 'Problem looking up Product' })
    }
  // move all of this inside of the fetch request to block builds when not necessary

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
  }
};
