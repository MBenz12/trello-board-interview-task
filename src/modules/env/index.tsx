export const logLevel =
  process.env.NEXT_PUBLIC_LOG_LEVEL ||
  (process.env.NODE_ENV === "production" ? "info" : "debug");

export const graphqlEndpoint =
  process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT ||
  "https://frontend.hiring.iodevnet.com/graphql";
