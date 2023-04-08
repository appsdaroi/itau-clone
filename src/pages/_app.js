import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import { Layout } from "@/modules/layout/";

import Cookies from "js-cookie";

export default function App({ Component, pageProps }) {
  if (pageProps.session) {
    Cookies.set("balance", pageProps.session.user.balance);
  } else {
    Cookies.remove("balance");
  }

  return (
    <SessionProvider session={pageProps.session}>
      {pageProps.session ? (
        <Layout>
          <Component {...pageProps} />
        </Layout>
      ) : (
        <Component {...pageProps} />
      )}
    </SessionProvider>
  );
}
