import { action } from "@storybook/addon-actions"

import 'svbstrate/src/lib/reset.css';
import 'svbstrate/src/lib/display.css';
import 'svbstrate/src/lib/positioning.css';
import 'svbstrate/src/lib/flexbox.css';
import 'svbstrate/src/lib/align.css';
import 'svbstrate/src/lib/spacing.css';


import '../src/styles/main.css'
import { addParameters, configure } from '@storybook/react';
// import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import React from 'react';
// Gatsby's Link overrides:
// Gatsby Link calls the `enqueue` & `hovering` methods on the global variable ___loader.
// This global object isn't set in storybook context, requiring you to override it to empty functions (no-op),
// so Gatsby Link doesn't throw any errors.
configure( [
	require.context( "../src/components", true, /\.stories\.js$/ )
], module );
global.___loader = {
  enqueue: () => {},
  hovering: () => {},
}
// This global variable is prevents the "__BASE_PATH__ is not defined" error inside Storybook.
global.__BASE_PATH__ = "/"

// Navigating through a gatsby app using gatsby-link or any other gatsby component will use the `___navigate` method.
// In Storybook it makes more sense to log an action than doing an actual navigate. Checkout the actions addon docs for more info: https://github.com/storybookjs/storybook/tree/master/addons/actions.

window.___navigate = pathname => {
  action("NavigateTo:")(pathname)
}

