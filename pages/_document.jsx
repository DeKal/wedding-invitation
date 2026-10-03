import { Html, Head, Main, NextScript } from 'next/document';

// The invitation body is client-rendered (ssr:false), so the server HTML paints
// nothing visible before JS runs. That means these 4 stylesheets don't need to
// block the initial paint — doing so just delayed FCP/LCP. We load them
// NON-render-blocking: preload the bytes at high priority (so they fetch in
// parallel with the JS bundle), then apply them via the media="print"→onload
// swap. DOM/append order is preserved (864 → f7475 → fonts → inline-styles) so
// the cascade is identical to the original <head> order. <noscript> keeps it
// working for crawlers / JS-disabled clients.
const CSS = [
  '/assets/css/864e2106bcc38c28.css',
  '/assets/css/f7475d2542f31fc8.css',
  '/assets/fonts.css',
  '/assets/inline-styles.css',
];

export default function Document() {
  return (
    <Html lang="vi">
      <Head>
        {CSS.map((href) => (
          <link key={href} rel="preload" as="style" href={href} />
        ))}
        <script
          dangerouslySetInnerHTML={{
            __html:
              '(function(){var u=' +
              JSON.stringify(CSS) +
              ';for(var i=0;i<u.length;i++){var l=document.createElement("link");l.rel="stylesheet";l.href=u[i];l.media="print";l.onload=function(){this.onload=null;this.media="all";};document.head.appendChild(l);}})();',
          }}
        />
        <noscript>
          {CSS.map((href) => (
            <link key={href} rel="stylesheet" href={href} />
          ))}
        </noscript>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
