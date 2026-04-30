import { gql } from "./generated";

export const CREATE_CATEGORY = gql(`
  mutation CreateCategory($input: CreateCategoryInput!) {
    createCategory(createCategoryInput: $input) {
      success
      message
      category {
        id
        name
        iconName
        userId
        createdAt
      }
    }
  }
`);

export const CREATE_EXPENSE = gql(`
  mutation CreateExpense($input: CreateExpenseInput!) {
    createExpense(createExpenseInput: $input) {
      success
      message
      expense {
        id
        name
        description
        amount
        createdAt
        categoryId
      }
    }
  }
`);

export const UPDATE_EXPENSE = gql(`
  mutation UpdateExpense($input: UpdateExpenseInput!) {
    updateExpense(updateExpenseInput: $input) {
      success
      message
      expense {
        id
        name
        description
        amount
        createdAt
        categoryId
      }
    }
  }
`);

export const REMOVE_EXPENSE = gql(`
  mutation RemoveExpense($id: String!) {
    removeExpense(id: $id) {
      success
      message
    }
  }
`);
