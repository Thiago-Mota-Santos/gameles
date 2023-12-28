import "../styles/globals.css";
import "@radix-ui/themes/styles.css";
import type { AppProps } from "next/app";
import { Suspense } from "react";
import Toaster from "@repo/ui/toaster";
import { ReactRelayContainer } from "../relay/ReactRelayContainer";
import { AuthProvider } from "../context/AuthContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Suspense fallback="loading">
        <ReactRelayContainer Component={Component} props={pageProps} />
        <Toaster />
      </Suspense>
    </AuthProvider>
  );
}
