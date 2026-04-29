const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/graphql";

import type { TypedDocumentNode } from "@graphql-typed-document-node/core";
import { print } from "graphql";
import {
  CreateExpenseDocument,
  CreateCategoryDocument,
  GetExpensesDocument,
  GetCategoriesDocument,
  RemoveExpenseDocument,
  UpdateExpenseDocument,
  type CreateExpenseInput,
  type CreateCategoryMutation,
  type CreateCategoryMutationVariables,
  type CreateExpenseMutation,
  type CreateExpenseMutationVariables,
  type GetCategoriesQuery,
  type GetExpensesQuery,
  type RemoveExpenseMutation,
  type RemoveExpenseMutationVariables,
  type UpdateExpenseInput,
  type UpdateExpenseMutation,
  type UpdateExpenseMutationVariables,
} from "./graphql/generated";

type GraphQLResponse<T> = {
  data?: T;
  errors?: Array<{ message: string }>;
};

async function graphqlRequest<TData, TVariables = Record<string, never>>(
  document: TypedDocumentNode<TData, TVariables>,
  variables?: TVariables,
): Promise<TData> {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({
      query: print(document),
      variables,
    }),
  });

  let payload: GraphQLResponse<TData> | null = null;
  try {
    payload = (await response.json()) as GraphQLResponse<TData>;
  } catch {
    payload = null;
  }

  if (!response.ok) {
    const serverMessage = payload?.errors?.[0]?.message;
    throw new Error(
      serverMessage || `GraphQL request failed (HTTP ${response.status})`,
    );
  }

  if (!payload) {
    throw new Error("GraphQL response is not valid JSON");
  }

  if (payload.errors?.length) {
    throw new Error(payload.errors[0]?.message || "GraphQL request failed");
  }

  if (!payload.data) {
    throw new Error("GraphQL response is missing data");
  }

  return payload.data;
}

export async function createCategory(name: string, iconName: string) {
  const data = await graphqlRequest<
    CreateCategoryMutation,
    CreateCategoryMutationVariables
  >(CreateCategoryDocument, {
    input: { name, iconName },
  });

  return data.createCategory;
}

export async function getCategories() {
  const data = await graphqlRequest<GetCategoriesQuery>(GetCategoriesDocument);
  return data.categories;
}

export type ExpenseDTO = {
  id: string;
  name: string;
  description: string | null;
  amount: string;
  categoryId: string;
};

export async function getExpenses() {
  const data = await graphqlRequest<GetExpensesQuery>(GetExpensesDocument);
  return data.expenses;
}

export async function createExpense(input: {
  name: string;
  amount: string;
  categoryId: string;
  description?: string;
}) {
  const payload: CreateExpenseInput = {
    name: input.name,
    amount: input.amount,
    categoryId: input.categoryId,
    description: input.description ?? null,
  };

  const data = await graphqlRequest<
    CreateExpenseMutation,
    CreateExpenseMutationVariables
  >(CreateExpenseDocument, { input: payload });
  return data.createExpense;
}

export async function updateExpense(input: {
  id: string;
  name?: string;
  amount?: string;
  categoryId?: string;
  description?: string;
}) {
  const payload: UpdateExpenseInput = {
    id: input.id,
    name: input.name ?? null,
    amount: input.amount ?? null,
    categoryId: input.categoryId ?? null,
    description: input.description ?? null,
  };

  const data = await graphqlRequest<
    UpdateExpenseMutation,
    UpdateExpenseMutationVariables
  >(UpdateExpenseDocument, { input: payload });
  return data.updateExpense;
}

export async function removeExpense(id: string) {
  const data = await graphqlRequest<
    RemoveExpenseMutation,
    RemoveExpenseMutationVariables
  >(RemoveExpenseDocument, { id });
  return data.removeExpense;
}
