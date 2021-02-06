const sanityClient = require('@sanity/client');

module.exports = sanityClient({
  projectId: process.env.GATSBY_SANITY_PROJECT_ID,
  dataset: process.env.GATSBY_SANITY_DATASET,
  token: process.env.SANITY_API_TOKEN,
  useCdn: false
});