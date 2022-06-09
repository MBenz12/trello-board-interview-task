import type { AppProps } from "next/app";

import "../modules/styles/themes.css";
import "../modules/styles/global.css";

import { ApolloProvider } from "../modules/apollo";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}
