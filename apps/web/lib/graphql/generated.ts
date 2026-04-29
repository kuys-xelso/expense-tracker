import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: { input: string; output: string; }
  /** Decimal custom scalar type */
  Decimal: { input: string; output: string; }
};

export type Category = {
  __typename?: 'Category';
  createdAt: Scalars['DateTime']['output'];
  iconName: Scalars['String']['output'];
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  userId: Scalars['String']['output'];
};

export type CategoryMessageResponse = {
  __typename?: 'CategoryMessageResponse';
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
};

export type CategoryResponse = {
  __typename?: 'CategoryResponse';
  category: Category;
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
};

export type CreateCategoryInput = {
  iconName: Scalars['String']['input'];
  name: Scalars['String']['input'];
};

export type CreateExpenseInput = {
  amount: Scalars['Decimal']['input'];
  categoryId: Scalars['String']['input'];
  description: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
};

export type CreateIncomeCategoryInput = {
  iconName: Scalars['String']['input'];
  name: Scalars['String']['input'];
};

export type CreateIncomeInput = {
  amount: Scalars['Decimal']['input'];
  categoryId: Scalars['String']['input'];
  description: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
};

export type DashboardCategoryTotal = {
  __typename?: 'DashboardCategoryTotal';
  categoryId: Scalars['String']['output'];
  categoryName: Scalars['String']['output'];
  expenseCount: Scalars['Int']['output'];
  totalAmount: Scalars['Decimal']['output'];
};

export type DashboardData = {
  __typename?: 'DashboardData';
  currentMonthAmount: Scalars['Decimal']['output'];
  currentMonthExpenses: Scalars['Int']['output'];
  expensesByCategory: Array<DashboardCategoryTotal>;
  recentExpenses: Array<Expense>;
  totalAmount: Scalars['Decimal']['output'];
  totalExpenses: Scalars['Int']['output'];
};

export type Expense = {
  __typename?: 'Expense';
  amount: Scalars['Decimal']['output'];
  categoryId: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  description: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  userId: Scalars['String']['output'];
};

export type ExpenseMessageResponse = {
  __typename?: 'ExpenseMessageResponse';
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
};

export type ExpenseResponse = {
  __typename?: 'ExpenseResponse';
  expense: Expense;
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
};

export type Income = {
  __typename?: 'Income';
  amount: Scalars['Decimal']['output'];
  categoryId: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  description: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  userId: Scalars['String']['output'];
};

export type IncomeCategory = {
  __typename?: 'IncomeCategory';
  createdAt: Scalars['DateTime']['output'];
  iconName: Scalars['String']['output'];
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  userId: Scalars['String']['output'];
};

export type IncomeCategoryMessageResponse = {
  __typename?: 'IncomeCategoryMessageResponse';
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
};

export type IncomeCategoryResponse = {
  __typename?: 'IncomeCategoryResponse';
  category: IncomeCategory;
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
};

export type IncomeDashboardCategoryTotal = {
  __typename?: 'IncomeDashboardCategoryTotal';
  categoryId: Scalars['String']['output'];
  categoryName: Scalars['String']['output'];
  incomeCount: Scalars['Int']['output'];
  totalAmount: Scalars['Decimal']['output'];
};

export type IncomeDashboardData = {
  __typename?: 'IncomeDashboardData';
  currentMonthAmount: Scalars['Decimal']['output'];
  currentMonthIncomes: Scalars['Int']['output'];
  incomesByCategory: Array<IncomeDashboardCategoryTotal>;
  recentIncomes: Array<Income>;
  totalAmount: Scalars['Decimal']['output'];
  totalIncomes: Scalars['Int']['output'];
};

export type IncomeMessageResponse = {
  __typename?: 'IncomeMessageResponse';
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
};

export type IncomeResponse = {
  __typename?: 'IncomeResponse';
  income: Income;
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createCategory: CategoryResponse;
  createExpense: ExpenseResponse;
  createIncome: IncomeResponse;
  createIncomeCategory: IncomeCategoryResponse;
  removeCategory: CategoryMessageResponse;
  removeExpense: ExpenseMessageResponse;
  removeIncome: IncomeMessageResponse;
  removeIncomeCategory: IncomeCategoryMessageResponse;
  updateCategory: CategoryResponse;
  updateExpense: ExpenseResponse;
  updateIncome: IncomeResponse;
  updateIncomeCategory: IncomeCategoryResponse;
  updateProfile: User;
};


export type MutationCreateCategoryArgs = {
  createCategoryInput: CreateCategoryInput;
};


export type MutationCreateExpenseArgs = {
  createExpenseInput: CreateExpenseInput;
};


export type MutationCreateIncomeArgs = {
  createIncomeInput: CreateIncomeInput;
};


export type MutationCreateIncomeCategoryArgs = {
  createIncomeCategoryInput: CreateIncomeCategoryInput;
};


export type MutationRemoveCategoryArgs = {
  id: Scalars['String']['input'];
};


export type MutationRemoveExpenseArgs = {
  id: Scalars['String']['input'];
};


export type MutationRemoveIncomeArgs = {
  id: Scalars['String']['input'];
};


export type MutationRemoveIncomeCategoryArgs = {
  id: Scalars['String']['input'];
};


export type MutationUpdateCategoryArgs = {
  updateCategoryInput: UpdateCategoryInput;
};


export type MutationUpdateExpenseArgs = {
  updateExpenseInput: UpdateExpenseInput;
};


export type MutationUpdateIncomeArgs = {
  updateIncomeInput: UpdateIncomeInput;
};


export type MutationUpdateIncomeCategoryArgs = {
  updateIncomeCategoryInput: UpdateIncomeCategoryInput;
};


export type MutationUpdateProfileArgs = {
  updateProfileInput: UpdateProfileInput;
};

export type Query = {
  __typename?: 'Query';
  categories: Array<Category>;
  category: Category;
  dashboard: DashboardData;
  expense: Maybe<Expense>;
  expenses: Array<Expense>;
  income: Maybe<Income>;
  incomeCategories: Array<IncomeCategory>;
  incomeCategory: Maybe<IncomeCategory>;
  incomeDashboard: IncomeDashboardData;
  incomes: Array<Income>;
  me: User;
};


export type QueryCategoryArgs = {
  id: Scalars['String']['input'];
};


export type QueryExpenseArgs = {
  id: Scalars['String']['input'];
};


export type QueryIncomeArgs = {
  id: Scalars['String']['input'];
};


export type QueryIncomeCategoryArgs = {
  id: Scalars['String']['input'];
};

export type UpdateCategoryInput = {
  iconName: InputMaybe<Scalars['String']['input']>;
  id: Scalars['String']['input'];
  name: InputMaybe<Scalars['String']['input']>;
};

export type UpdateExpenseInput = {
  amount: InputMaybe<Scalars['Decimal']['input']>;
  categoryId: InputMaybe<Scalars['String']['input']>;
  description: InputMaybe<Scalars['String']['input']>;
  id: Scalars['String']['input'];
  name: InputMaybe<Scalars['String']['input']>;
};

export type UpdateIncomeCategoryInput = {
  iconName: InputMaybe<Scalars['String']['input']>;
  id: Scalars['String']['input'];
  name: InputMaybe<Scalars['String']['input']>;
};

export type UpdateIncomeInput = {
  amount: InputMaybe<Scalars['Decimal']['input']>;
  categoryId: InputMaybe<Scalars['String']['input']>;
  description: InputMaybe<Scalars['String']['input']>;
  id: Scalars['String']['input'];
  name: InputMaybe<Scalars['String']['input']>;
};

export type UpdateProfileInput = {
  image: Scalars['String']['input'];
  name: Scalars['String']['input'];
};

export type User = {
  __typename?: 'User';
  email: Scalars['String']['output'];
  id: Scalars['String']['output'];
  image: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
};

export type CreateCategoryMutationVariables = Exact<{
  input: CreateCategoryInput;
}>;


export type CreateCategoryMutation = { __typename?: 'Mutation', createCategory: { __typename?: 'CategoryResponse', success: boolean, message: string, category: { __typename?: 'Category', id: string, name: string, iconName: string, userId: string, createdAt: string } } };

export type GetCategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCategoriesQuery = { __typename?: 'Query', categories: Array<{ __typename?: 'Category', id: string, name: string, iconName: string, createdAt: string }> };

export type GetExpensesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetExpensesQuery = { __typename?: 'Query', expenses: Array<{ __typename?: 'Expense', id: string, name: string, description: string | null, amount: string, createdAt: string, categoryId: string }> };

export type CreateExpenseMutationVariables = Exact<{
  input: CreateExpenseInput;
}>;


export type CreateExpenseMutation = { __typename?: 'Mutation', createExpense: { __typename?: 'ExpenseResponse', success: boolean, message: string, expense: { __typename?: 'Expense', id: string, name: string, description: string | null, amount: string, createdAt: string, categoryId: string } } };

export type UpdateExpenseMutationVariables = Exact<{
  input: UpdateExpenseInput;
}>;


export type UpdateExpenseMutation = { __typename?: 'Mutation', updateExpense: { __typename?: 'ExpenseResponse', success: boolean, message: string, expense: { __typename?: 'Expense', id: string, name: string, description: string | null, amount: string, createdAt: string, categoryId: string } } };

export type RemoveExpenseMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type RemoveExpenseMutation = { __typename?: 'Mutation', removeExpense: { __typename?: 'ExpenseMessageResponse', success: boolean, message: string } };


export const CreateCategoryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateCategory"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateCategoryInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createCategory"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"createCategoryInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"category"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"iconName"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]}}]} as unknown as DocumentNode<CreateCategoryMutation, CreateCategoryMutationVariables>;
export const GetCategoriesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetCategories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"categories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"iconName"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]} as unknown as DocumentNode<GetCategoriesQuery, GetCategoriesQueryVariables>;
export const GetExpensesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetExpenses"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"expenses"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"categoryId"}}]}}]}}]} as unknown as DocumentNode<GetExpensesQuery, GetExpensesQueryVariables>;
export const CreateExpenseDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateExpense"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateExpenseInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createExpense"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"createExpenseInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"expense"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"categoryId"}}]}}]}}]}}]} as unknown as DocumentNode<CreateExpenseMutation, CreateExpenseMutationVariables>;
export const UpdateExpenseDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateExpense"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateExpenseInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateExpense"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"updateExpenseInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"expense"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"categoryId"}}]}}]}}]}}]} as unknown as DocumentNode<UpdateExpenseMutation, UpdateExpenseMutationVariables>;
export const RemoveExpenseDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RemoveExpense"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeExpense"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<RemoveExpenseMutation, RemoveExpenseMutationVariables>;