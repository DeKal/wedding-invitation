import { Html, Head, Main, NextScript } from 'next/document';

// Loads the invitation's original stylesheets as static assets (same files the
// static page links), in the same order, then the extracted inline styles last
// so node-level rules win on ties — matching the original <head> ordering.
// Only affects React pages; the static page at / is served directly.
export default function Document() {
  return (
    <Html lang="vi">
      <Head>
        <link rel="stylesheet" href="/assets/css/864e2106bcc38c28.css" />
        <link rel="stylesheet" href="/assets/css/f7475d2542f31fc8.css" />
        <link rel="stylesheet" href="/assets/fonts.css" />
        <link rel="stylesheet" href="/assets/inline-styles.css" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
