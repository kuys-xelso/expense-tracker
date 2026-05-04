import { gql } from "./generated";

export const REMOVE_CATEGORY = gql(`
  mutation RemoveCategory($id: String!) {
    removeCategory(id: $id) {
      success
      message
    }
  }
`);

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

export const CREATE_INCOME = gql(`
  mutation CreateIncome($input: CreateIncomeInput!) {
    createIncome(createIncomeInput: $input) {
      success
      message
      income {
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

export const UPDATE_INCOME = gql(`
  mutation UpdateIncome($input: UpdateIncomeInput!) {
    updateIncome(updateIncomeInput: $input) {
      success
      message
      income {
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

export const REMOVE_INCOME = gql(`
  mutation RemoveIncome($id: String!) {
    removeIncome(id: $id) {
      success
      message
    }
  }
`);
