import { Theme } from "@radix-ui/themes";
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className="bg-gray-100">
        <Theme>
          <Main />
          <NextScript />
        </Theme>
      </body>
    </Html>
  );
}
