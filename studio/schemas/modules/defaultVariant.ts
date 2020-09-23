export default {
  title: 'Product variant',
  name: 'defaultVariant',
  type: 'object',
  description: `This information is sync'd from Shopify and should not be modified here but is mostly just a reference.`,
  fieldsets: [
    {
      name: 'information',
      title: 'Variant Information',
      options: {
        collapsible: true,
        collapsed: true
      }
    }
  ],
  fields: [
    {
      title: 'Title',
      name: 'title',
      readOnly: true,
      type: 'string',
      fieldset: 'information'
    },
    {
      title: 'Weight in grams',
      name: 'grams',
      readOnly: true,
      type: 'number',
      fieldset: 'information'
    },
    {
      title: 'Price',
      name: 'price',
      readOnly: true,
      type: 'string',
      fieldset: 'information'
    },
    {
      title: 'Variant Id',
      name: 'variantId',
      readOnly: true,
      type: 'number',
      fieldset: 'information'
    },
    {
      title: 'SKU',
      name: 'sku',
      readOnly: true,
      type: 'string',
      fieldset: 'information'
    },
    {
      title: 'Taxable',
      name: 'taxable',
      readOnly: true,
      type: 'boolean',
      fieldset: 'information'
    }, {
      title: 'Inventory Policy',
      name: 'inventoryPolicy',
      readOnly: true,
      type: 'string',
      fieldset: 'information'
    },
    {
      title: 'Inventory Quantity',
      name: 'inventoryQuantity',
      readOnly: true,
      type: 'number',
      fieldset: 'information'
    },
    {
      title: 'Bar code',
      name: 'barcode',
      readOnly: true,
      type: 'string',
      fieldset: 'information'
    }
  ]
}
