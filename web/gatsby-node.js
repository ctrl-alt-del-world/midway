// Setup environment variables
require('dotenv').config({ path: `.env.${process.env.NODE_ENV || 'development'}` });

const { filter } = require('rxjs/operators');
const client = require('./src/api/sanity');

const {
  getAllPageData,
  createAllPages,
} = require('./src/build/createPages');

const CURRENT_COMMIT = require('child_process')
  .execSync('git rev-parse HEAD')
  .toString()
  .trim();

exports.createPages = ({ actions }) => new Promise((resolve, reject) => {
  getAllPageData()
    .then(allResponses => {
      createAllPages(
        allResponses,
        actions,
        resolve,
        reject
      )
    });
});

exports.onCreateWebpackConfig = ({
  plugins,
  actions,
}) => {
  actions.setWebpackConfig({
    plugins: [
      plugins.define({
        'process.env.GITCOMMIT': JSON.stringify(CURRENT_COMMIT),
      }),
    ],
  });
};

exports.onCreatePage = async ({ page, actions }) => {
  const { deletePage } = actions;

  // Delete dev 404 page for accounts to work in dev
  if (page.internalComponentName === 'ComponentDev404Page') {
    deletePage(page);
  }
};

exports.sourceNodes = async ({
  actions,
  createContentDigest,
  createNodeId,
}) => {
  client
    .listen('*[!(_id in path("_.**"))]')
    .pipe(filter(event => !event.documentId.startsWith('drafts.')))
    .subscribe(() => {
      const update = { date: new Date() };

      actions.createNode({
        id: createNodeId(1),
        internal: {
          type: 'update',
          content: JSON.stringify(update),
          contentDigest: createContentDigest(update),
        },
      });

      console.log('[gatsby-node]: CMS update triggered');
    })
};