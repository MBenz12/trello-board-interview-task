import React from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider as OriginalApolloProvider,
  from,
  HttpLink,
  ApolloLink,
} from "@apollo/client";
import { RetryLink } from "@apollo/client/link/retry";
import { onError } from "@apollo/client/link/error";

import { graphqlEndpoint } from "../env";
import { logger } from "../logger";

const buildLink = (): ApolloLink => {
  return from([
    onError(({ operation, graphQLErrors, networkError }) => {
      logger.error(
        { operation, graphQLErrors, networkError },
        `Failed to load ${operation.operationName}`
      );
    }),

    new RetryLink({
      delay: {
        initial: 500,
        max: 5000,
        jitter: true,
      },
      attempts: {
        max: 10,
      },
    }),

    new HttpLink({ uri: graphqlEndpoint }),
  ]);
};

const apolloClient = new ApolloClient({
  link: buildLink(),
  defaultOptions: {
    watchQuery: {
      notifyOnNetworkStatusChange: true,
      canonizeResults: true,
      fetchPolicy: "cache-and-network",
      returnPartialData: true,
    },
  },
  cache: new InMemoryCache(),
});

export const ApolloProvider = ({
  children,
}: {
  children?: React.ReactNode;
}) => {
  return (
    <OriginalApolloProvider client={apolloClient}>
      {children}
    </OriginalApolloProvider>
  );
};
