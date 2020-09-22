import React from 'react'

import { Story, Meta } from '@storybook/react/types-6-0';
import { Header } from '../components/header'

export default {
  title: "Site/Navigation",
  component: Header
}

const Template: Story<> = (args) => <Header {...args} />;

export const Primary = Template.bind({});