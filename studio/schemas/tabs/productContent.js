import Tabs from 'sanity-plugin-tabs'

export default {
  name: "productContent",
  type: "object",
  inputComponent: Tabs,
  fieldsets: [
    { name: "main", title: "Main" },
    { name: "shopify", title: "Shopify" },
    { name: "defaultMeta", title: "Meta" }
  ],
  fields: [
    {
      type: "productModule",
      name: "main",
      fieldset: "main"
    },
    {
      type: "shopifyProductModule",
      name: "shopify",
      fieldset: "shopify"
    },
    {
      type: "metaCard",
      name: "meta",
      fieldset: "defaultMeta"
    }
  ]
}
