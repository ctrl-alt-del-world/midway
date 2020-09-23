import React from 'react'

export default {
	name: 'redirect',
	title: 'Redirect',
	type: 'document',
	fields: [
		{
			name: 'fromPath',
			title: 'From Path',
			type: 'string',
			description: 'Old slug being redirected FROM. Use preceding slash (e.g. "/help")',
			validation: Rule => Rule.required(),
		},
		{
			name: 'toPath',
			title: 'To Path',
			type: 'string',
			description: 'New slug being redirected TO. Use preceding slash (e.g. "/support")',
			validation: Rule => Rule.required(),
		},
		{
			name: 'statusCode',
			title: 'Status Code',
			type: 'number',
			description: 'Default: 302 (temporary redirect). Permanent: 301. Not Found: 404. For any other uses, refer to this guide: https://developer.mozilla.org/en-US/docs/Web/HTTP/Status'
		}
	],
	preview: {
		select: {
			title: 'toPath',
			from: 'fromPath',
		},
		prepare(selection) {
			const { title, from } = selection;
			return {
				title: `${from} ➡️ ${title}`
			};
		}
	}
};