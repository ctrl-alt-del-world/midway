import React from 'react';

export default {
	name: 'subscription',
	title: 'Subscriptions',
	type: 'document',
	__experimental_actions: ['update', 'publish', 'delete'],
	fields: [
		{
			name: 'title',
			title: 'Title',
			type: 'string',
			readOnly: true,
		},
		{
			name: 'discountAmount',
			title: 'Discount Amount',
			type: 'number',
			readOnly: true,
		},
		{
			name: 'discountType',
			title: 'Discount Type',
			type: 'string',
			list: ['percentage', 'fixed_amount'],
			readOnly: true,
		},
		{
			name: 'chargeIntervalFrequency',
			title: 'Charge Interval Frequency',
			type: 'number',
			readOnly: true,
		},
		{
			name: 'cutoffDayOfMonth',
			title: 'Cutoff Day of Month',
			type: 'number',
			readOnly: true,
		},
		{
			name: 'cutoffDayOfWeek',
			title: 'Cutoff Day of Week',
			type: 'number',
			readOnly: true,
		},
		{
			name: 'expireAfterSpecificNumberOfCharges',
			title: 'Expire after specific number of charges',
			type: 'number',
			readOnly: true,
		},
		{
			name: 'modifiableProperties',
			title: 'Modifiable Properties',
			type: 'array',
			of: [{type: 'string'}],
			readOnly: true,
		},
		{
			name: 'numberChargesUntilExpiration',
			title: 'Number of charges until expiration',
			type: 'number',
			readOnly: true,
		},
		{
			name: 'orderDayOfMonth',
			title: 'Order day of month',
			type: 'number',
			readOnly: true,
		},
		{
			name: 'orderDayOfWeek',
			title: 'Order day of week',
			type: 'number',
			readOnly: true,
		},
		{
			name: 'orderIntervalFrequencyOptions',
			title: 'Order interval frequency options',
			type: 'array',
			of: [{type: 'number'}],
			readOnly: true,
		},
		{
			name: 'orderIntervalUnit',
			title: 'Order interval unit',
			type: 'string',
			list: ['day', 'week', 'month'],
			readOnly: true,
		},
		{
			name: 'storefrontPurchaseOptions',
			title: 'Storefront purchase options',
			type: 'string',
			readOnly: true,
		},
	],
};