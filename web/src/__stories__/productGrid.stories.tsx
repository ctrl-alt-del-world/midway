import React from 'react'

import { Story, Meta } from '@storybook/react/types-6-0';
import { ProductGrid, ProductGridProps } from 'src/components/global/productGrid'

export default {
  title: "Site/Global/ProductGrid",
  component: ProductGrid
}

const Template: Story<ProductGridProps> = (args) => <ProductGrid {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  data: {
    title: 'Products',
    shortDescription: 'We love products',
    products: [
      {
        _id: 'testing',
        content: {
          main: {
            slug: {
              current: 'testing'
            },
            mainImage: {
              asset: {
                _ref: 'image-04130df058ce90a74090a8c68b81b14bff2d38bd-1200x1200-jpg'
              }
            },
            title: 'Testing'
          },
          shopify: {
            defaultPrice: '45.00'
          }
        }
      },
      {
        _id: 'testingtw',
        content: {
          main: {
            slug: {
              current: 'testing'
            },
            mainImage: {
              asset: {
                _ref: 'image-04130df058ce90a74090a8c68b81b14bff2d38bd-1200x1200-jpg'
              }
            },
            title: 'Testing'
          },
          shopify: {
            defaultPrice: '45.00'
          }
        }
      },
      {
        _id: 'testingthre',
        content: {
          main: {
            slug: {
              current: 'testing'
            },
            mainImage: {
              asset: {
                _ref: 'image-04130df058ce90a74090a8c68b81b14bff2d38bd-1200x1200-jpg'
              }
            },
            title: 'Testing'
          },
          shopify: {
            defaultPrice: '45.00'
          }
        }
      }
    ]
  }
};