import Tabs from 'sanity-plugin-tabs'

export default {
  name: "globalContent",
  type: "object",
  inputComponent: Tabs,
  fieldsets: [
    { name: "defaultMeta", title: "Meta" },
    { name: "social", title: "Social" }
  ],
  fields: [
    {
      type: "metaCard",
      name: "meta",
      description: "Handles the default meta information for all content types",
      fieldset: "defaultMeta"
    },
    {
      type: "social",
      name: "social",
      description: "Handles the default meta information for all content types",
      fieldset: "social"
    }
  ]
}