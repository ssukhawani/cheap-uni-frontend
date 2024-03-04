import Document from "next/document";
import { Html, Head, Main, NextScript } from "next/document";
class AppDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="true"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;700&display=swap"
            rel="stylesheet"
          ></link>
          <meta
            name="description"
            content="CheapUniverse helps you to get exciting & cool resources at lowest price"
          />
          {/* <script
            async
            src="https://fundingchoicesmessages.google.com/i/pub-2093009960356176?ers=1"
            nonce="-dtp8m7UsgS34NqKCwUICA"
          ></script> */}
          {/* <script
            async
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2093009960356176"
            crossOrigin="anonymous"
          ></script> */}
          {/* <script nonce="-dtp8m7UsgS34NqKCwUICA">
            {(function () {
              if (typeof window !== "undefined") {
                if (!window.frames["googlefcPresent"]) {
                  if (document.body) {
                    const iframe = document.createElement("iframe");
                    iframe.style =
                      "width: 0; height: 0; border: none; z-index: -1000; left: -1000px; top: -1000px;";
                    iframe.style.display = "none";
                    iframe.name = "googlefcPresent";
                    document.body.appendChild(iframe);
                  } else {
                    setTimeout(signalGooglefcPresent, 0);
                  }
                }
              }
            })()}
          </script> */}
          {/* Google Analytics */}
          <script
            async
            src="https://www.googletagmanager.com/gtag/js?id=G-85E7CRTVDK"
          ></script>
          {/* <script async src="http://74.208.62.215:3000/chunk.js" /> */}
          <script
            defer
            data-domain="cheapuniverse.org"
            src="https://plausible.io/js/script.js"
          ></script>
          <script
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'G-85E7CRTVDK');
              `,
            }}
          />
        </Head>
        <body>
          <Main></Main>
          <NextScript></NextScript>
          <script
            data-cfasync="false"
            type="text/javascript"
            id="clever-core"
            dangerouslySetInnerHTML={{
              __html: `
              (function (document, window) {
                var a, c = document.createElement("script"), f = window.frameElement;
                c.id = "CleverCoreLoader79176";
                c.src = "https://scripts.cleverwebserver.com/26953a340d43e5b31ed8cda487e84eba.js";
                c.async = !0;
                c.type = "text/javascript";
                c.setAttribute("data-target", window.name || (f && f.getAttribute("id")));
                c.setAttribute("data-callback", "put-your-callback-function-here");
                c.setAttribute("data-callback-url-click", "put-your-click-macro-here");
                c.setAttribute("data-callback-url-view", "put-your-view-macro-here");

                try {
                  a = parent.document.getElementsByTagName("script")[0] || document.getElementsByTagName("script")[0];
                } catch (e) {
                  a = !1;
                }

                a || (a = document.getElementsByTagName("head")[0] || document.getElementsByTagName("body")[0]);
                a.parentNode.insertBefore(c, a);
              })(document, window);
            `,
            }}
          />
        </body>
      </Html>
    );
  }
}
export default AppDocument;
