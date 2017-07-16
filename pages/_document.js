import Document, { Head, Main, NextScript } from "next/document";
import { ServerStyleSheet, injectGlobal } from "styled-components";

export default class MyDocument extends Document {
  render() {
    const sheet = new ServerStyleSheet();
    const main = sheet.collectStyles(<Main />);
    const styleTags = sheet.getStyleElement();
    return (
      <html>
        <Head>
          <title>Tangle Certs - Demo</title>
          {styleTags}
        </Head>
        <body>
          <div className="root">
            {main}
          </div>
          <NextScript />
        </body>
      </html>
    );
  }
}

injectGlobal`
  body {
    margin: 0;
    color: #131515;
    font-family: AvenirLight;
    -webkit-font-smoothing: antialiased;
    word-break: normal;

  }

  @font-face {
    font-family: 'Avenir';
    src: url('/static/fonts/avenir-roman.woff');
  }
    @font-face {
    font-family: 'AvenirLight';
    src: url('/static/fonts/avenir-light.woff');
  }
`;
