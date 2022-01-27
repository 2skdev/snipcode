import NextDocument, { Head, Html, Main, NextScript } from "next/document";

class Document extends NextDocument<{}> {
  render() {
    return (
      <Html>
        <Head>
          <link
            rel="stylesheet"
            href="https://cdn.jsdelivr.net/gh/devicons/devicon@v2.14.0/devicon.min.css"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default Document;
