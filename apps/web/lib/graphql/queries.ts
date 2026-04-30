import { gql } from "./generated";

export const GET_CATEGORIES = gql(`
  query GetCategories {
    categories {
      id
      name
      iconName
      createdAt
    }
  }
`);

export const GET_EXPENSES = gql(`
  query GetExpenses {
    expenses {
      id
      name
      description
      amount
      createdAt
      categoryId
    }
  }
`);
