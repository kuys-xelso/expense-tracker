"use client";

import { ApolloLink, HttpLink } from "@apollo/client";
import {
  ApolloClient,
  ApolloNextAppProvider,
  InMemoryCache,
  SSRMultipartLink,
} from "@apollo/client-integration-nextjs";

const BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL ||
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:3001";

function makeClient() {
  const httpLink = new HttpLink({
    uri: `${BACKEND_URL}/graphql`,
    credentials: "include",
  });

  return new ApolloClient({
    cache: new InMemoryCache(),
    link:
      typeof window === "undefined"
        ? ApolloLink.from([new SSRMultipartLink({ stripDefer: true }), httpLink])
        : httpLink,
  });
}

export function ApolloProvider({ children }: React.PropsWithChildren) {
  return (
    <ApolloNextAppProvider makeClient={makeClient}>
      {children}
    </ApolloNextAppProvider>
  );
}
