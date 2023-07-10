import React, { useState } from "react";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ThemeRegistry from "@/components/Theme/ThemeRegistry/ThemeRegistry";
import Head from "next/head";
import "./index.css";
import AppHeader from "@/components/common/AppHeader";

export const metadata = {
  title: "Next App ",
  description: "next app"
};

export default function RootLayout({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <div>
      <Head>
        <title>Welcome!</title>
      </Head>
      <div>
        <ThemeRegistry>
          <QueryClientProvider client={queryClient}>
            <AppHeader />
            <Component {...pageProps} />
          </QueryClientProvider>
        </ThemeRegistry>
      </div>
    </div>
  );
}
