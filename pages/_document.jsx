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
        {/* Render-blocking so it applies before iOS Safari's first layout. The
            main stylesheet also sets this but loads non-render-blocking, which
            lets iOS "font boost" (text autosizing) inflate text inside the fixed
            500px canvas before the guard arrives. Inlining it here stops that. */}
        <style
          dangerouslySetInnerHTML={{
            __html:
              'html,body{-webkit-text-size-adjust:none;text-size-adjust:none}' +
              /* Canvas is scaled with transform:scale from top-left (see
                 useInvitationBehaviour fit()). The vendor rule
                 #root-page-container{margin:0 auto} was a no-op under CSS zoom
                 (box became full width) but now offsets the still-500px box and
                 breaks layout >=768px. Zero it with higher specificity. */
              '#app-view-index #root-page-container{margin:0!important}',
          }}
        />
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
