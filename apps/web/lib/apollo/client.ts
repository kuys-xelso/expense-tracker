import { HttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import {
  ApolloClient,
  InMemoryCache,
  registerApolloClient,
} from "@apollo/client-integration-nextjs";
import { cookies } from "next/headers";

const BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL ||
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:3001";

export const { getClient, query, PreloadQuery } = registerApolloClient(() => {
  const httpLink = new HttpLink({
    uri: `${BACKEND_URL}/graphql`,
  });

  const authLink = setContext(async (_, { headers }) => {
    const cookieStore = await cookies();

    return {
      headers: {
        ...headers,
        cookie: cookieStore.toString(),
      },
    };
  });

  return new ApolloClient({
    cache: new InMemoryCache(),
    link: authLink.concat(httpLink),
  });
});
