/* eslint-disable */
import * as types from './graphql';
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "\n  mutation RemoveCategory($id: String!) {\n    removeCategory(id: $id) {\n      success\n      message\n    }\n  }\n": typeof types.RemoveCategoryDocument,
    "\n  mutation CreateCategory($input: CreateCategoryInput!) {\n    createCategory(createCategoryInput: $input) {\n      success\n      message\n      category {\n        id\n        name\n        iconName\n        userId\n        createdAt\n      }\n    }\n  }\n": typeof types.CreateCategoryDocument,
    "\n  mutation CreateExpense($input: CreateExpenseInput!) {\n    createExpense(createExpenseInput: $input) {\n      success\n      message\n      expense {\n        id\n        name\n        description\n        amount\n        createdAt\n        categoryId\n      }\n    }\n  }\n": typeof types.CreateExpenseDocument,
    "\n  mutation UpdateExpense($input: UpdateExpenseInput!) {\n    updateExpense(updateExpenseInput: $input) {\n      success\n      message\n      expense {\n        id\n        name\n        description\n        amount\n        createdAt\n        categoryId\n      }\n    }\n  }\n": typeof types.UpdateExpenseDocument,
    "\n  mutation RemoveExpense($id: String!) {\n    removeExpense(id: $id) {\n      success\n      message\n    }\n  }\n": typeof types.RemoveExpenseDocument,
    "\n  query GetCategories {\n    categories {\n      id\n      name\n      iconName\n      createdAt\n    }\n  }\n": typeof types.GetCategoriesDocument,
    "\n  query GetExpenses {\n    expenses {\n      id\n      name\n      description\n      amount\n      createdAt\n      categoryId\n    }\n  }\n": typeof types.GetExpensesDocument,
};
const documents: Documents = {
    "\n  mutation RemoveCategory($id: String!) {\n    removeCategory(id: $id) {\n      success\n      message\n    }\n  }\n": types.RemoveCategoryDocument,
    "\n  mutation CreateCategory($input: CreateCategoryInput!) {\n    createCategory(createCategoryInput: $input) {\n      success\n      message\n      category {\n        id\n        name\n        iconName\n        userId\n        createdAt\n      }\n    }\n  }\n": types.CreateCategoryDocument,
    "\n  mutation CreateExpense($input: CreateExpenseInput!) {\n    createExpense(createExpenseInput: $input) {\n      success\n      message\n      expense {\n        id\n        name\n        description\n        amount\n        createdAt\n        categoryId\n      }\n    }\n  }\n": types.CreateExpenseDocument,
    "\n  mutation UpdateExpense($input: UpdateExpenseInput!) {\n    updateExpense(updateExpenseInput: $input) {\n      success\n      message\n      expense {\n        id\n        name\n        description\n        amount\n        createdAt\n        categoryId\n      }\n    }\n  }\n": types.UpdateExpenseDocument,
    "\n  mutation RemoveExpense($id: String!) {\n    removeExpense(id: $id) {\n      success\n      message\n    }\n  }\n": types.RemoveExpenseDocument,
    "\n  query GetCategories {\n    categories {\n      id\n      name\n      iconName\n      createdAt\n    }\n  }\n": types.GetCategoriesDocument,
    "\n  query GetExpenses {\n    expenses {\n      id\n      name\n      description\n      amount\n      createdAt\n      categoryId\n    }\n  }\n": types.GetExpensesDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation RemoveCategory($id: String!) {\n    removeCategory(id: $id) {\n      success\n      message\n    }\n  }\n"): (typeof documents)["\n  mutation RemoveCategory($id: String!) {\n    removeCategory(id: $id) {\n      success\n      message\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation CreateCategory($input: CreateCategoryInput!) {\n    createCategory(createCategoryInput: $input) {\n      success\n      message\n      category {\n        id\n        name\n        iconName\n        userId\n        createdAt\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation CreateCategory($input: CreateCategoryInput!) {\n    createCategory(createCategoryInput: $input) {\n      success\n      message\n      category {\n        id\n        name\n        iconName\n        userId\n        createdAt\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation CreateExpense($input: CreateExpenseInput!) {\n    createExpense(createExpenseInput: $input) {\n      success\n      message\n      expense {\n        id\n        name\n        description\n        amount\n        createdAt\n        categoryId\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation CreateExpense($input: CreateExpenseInput!) {\n    createExpense(createExpenseInput: $input) {\n      success\n      message\n      expense {\n        id\n        name\n        description\n        amount\n        createdAt\n        categoryId\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation UpdateExpense($input: UpdateExpenseInput!) {\n    updateExpense(updateExpenseInput: $input) {\n      success\n      message\n      expense {\n        id\n        name\n        description\n        amount\n        createdAt\n        categoryId\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateExpense($input: UpdateExpenseInput!) {\n    updateExpense(updateExpenseInput: $input) {\n      success\n      message\n      expense {\n        id\n        name\n        description\n        amount\n        createdAt\n        categoryId\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation RemoveExpense($id: String!) {\n    removeExpense(id: $id) {\n      success\n      message\n    }\n  }\n"): (typeof documents)["\n  mutation RemoveExpense($id: String!) {\n    removeExpense(id: $id) {\n      success\n      message\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetCategories {\n    categories {\n      id\n      name\n      iconName\n      createdAt\n    }\n  }\n"): (typeof documents)["\n  query GetCategories {\n    categories {\n      id\n      name\n      iconName\n      createdAt\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetExpenses {\n    expenses {\n      id\n      name\n      description\n      amount\n      createdAt\n      categoryId\n    }\n  }\n"): (typeof documents)["\n  query GetExpenses {\n    expenses {\n      id\n      name\n      description\n      amount\n      createdAt\n      categoryId\n    }\n  }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;