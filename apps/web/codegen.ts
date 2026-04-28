import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "../api/schema.gql",
  documents: ["./lib/graphql/**/*.graphql"],
  generates: {
    "./lib/graphql/generated.ts": {
      plugins: ["typescript", "typescript-operations", "typed-document-node"],
      config: {
        avoidOptionals: true,
        scalars: {
          DateTime: "string",
          Decimal: "string",
        },
      },
    },
  },
  ignoreNoDocuments: false,
};

export default config;
