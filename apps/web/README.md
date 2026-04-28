# Web App Guide

## GraphQL Codegen (Next.js)

This app uses GraphQL Code Generator to create fully typed operations from the API schema.

### What is generated

- Schema + operation types
- Typed documents for each query/mutation

Generated file:

- `apps/web/lib/graphql/generated.ts`

Source operation documents:

- `apps/web/lib/graphql/operations.graphql`

Codegen config:

- `apps/web/codegen.ts`

## Prerequisites

1. API schema must be up to date in `apps/api/schema.gql`.
2. Web dependencies are installed from the monorepo root.

## Generate types

Run from monorepo root:

```bash
npm run -w @repo/web codegen
```

This reads:

- schema: `apps/api/schema.gql`
- documents: `apps/web/lib/graphql/**/*.graphql`

Then writes:

- `apps/web/lib/graphql/generated.ts`

## How to add a new query/mutation

1. Add operation to `apps/web/lib/graphql/operations.graphql`.
2. Run codegen:

```bash
npm run -w @repo/web codegen
```

3. Import generated document/types in your client or component.

Example:

```ts
import {
  CreateCategoryDocument,
  type CreateCategoryMutation,
  type CreateCategoryMutationVariables,
} from "./graphql/generated";
```

## How to use in `api-client.ts`

1. Keep a reusable GraphQL request helper.
2. Pass generated typed document + variables.
3. Return typed `data` fields.

Pattern:

```ts
const data = await graphqlRequest<
  CreateCategoryMutation,
  CreateCategoryMutationVariables
>(CreateCategoryDocument, {
  input: { name, iconName },
});

return data.createCategory;
```

## Typical workflow after backend schema changes

1. Update backend resolvers/DTOs.
2. Regenerate/update `apps/api/schema.gql`.
3. Update `operations.graphql` if needed.
4. Run web codegen.
5. Run type-check:

```bash
npm run -w @repo/web check-types
```

## Troubleshooting

- Error: `Cannot query field ... on type Query`
  - Operation does not match `apps/api/schema.gql`.
  - Fix schema or operation, then regenerate.

- Error: missing exports from `generated.ts`
  - Operation name not present in `operations.graphql`.
  - Re-run codegen and check operation names.

- Types stale after schema changes
  - Re-run `npm run -w @repo/web codegen`.

## Commands reference

```bash
# Generate GraphQL types/documents
npm run -w @repo/web codegen

# Verify TS types
npm run -w @repo/web check-types
```
