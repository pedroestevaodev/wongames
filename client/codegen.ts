import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
	overwrite: true,
	schema: `http://localhost:1337/graphql`,
	// schema: process.env.NEXT_PUBLIC_GRAPHQL_SCHEMA,
	documents: ['graphql/**/*.ts', 'graphql/**/*.tsx'],
	ignoreNoDocuments: true,
	generates: {
		'./graphql/generated/': {
			preset: 'client',
			plugins: []
		},
		'./graphql.schema.json': {
			plugins: ['introspection']
		}
	}
};

export default config;
