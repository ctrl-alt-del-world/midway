// Setup environment variables
require('dotenv').config({path: `.env.${process.env.NODE_ENV || 'development'}`});
const sanityClient = require('@sanity/client');
const exportDataset = require('@sanity/export');

const client = sanityClient({
	projectId: process.env.GATSBY_SANITY_PROJECT_ID,
	dataset: process.env.GATSBY_SANITY_DATASET,
	token: process.env.SANITY_API_TOKEN,
	useCdn: false,
});
const migration = async () => {
	await exportDataset({
		client,
		dataset: process.env.GATSBY_SANITY_DATASET,
		outputPath: `./exports/${process.env.GATSBY_SANITY_DATASET}-${new Date().getTime()}.tar.gz`,
		assets: true,
		drafts: true,
		assetConcurrency: 12,
	});
	console.log('success');
};
migration();