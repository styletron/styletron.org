import React from "react";
import Document, { Head, Main, NextScript } from "next/document";
import { Provider as StyletronProvider, styled } from "styletron-react";
import { styletron } from "../helpers/styletron";
import { GA_ID } from "../helpers/ga";

export default class MyDocument extends Document {
  static getInitialProps(props) {
    const page = props.renderPage(App => props => (
      <StyletronProvider value={styletron}>
        <App {...props} />
      </StyletronProvider>
    ));
    const stylesheets = styletron.getStylesheets() || [];
    const isProduction = process.env.NODE_ENV === "production";
    return { ...page, stylesheets, isProduction };
  }

  setGoogleTags() {
    return {
      __html: `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${GA_ID}');
      `
    };
  }


  initDelighted() {
    return {
      __html: `
        !function(e,t,r,n){if(!e[n]){for(var a=e[n]=[],i=["survey","reset","config","init","set","get","event","identify","track","page","screen","group","alias"],s=0;s<i.length;s++){var c=i[s];a[c]=a[c]||function(e){return function(){var t=Array.prototype.slice.call(arguments);a.push([e,t])}}(c)}a.SNIPPET_VERSION="1.0.1";var o=t.createElement("script");o.type="text/javascript",o.async=!0,o.src="https://d2yyd1h5u9mauk.cloudfront.net/integrations/web/v1/library/"+r+"/"+n+".js";var u=t.getElementsByTagName("script")[0];u.parentNode.insertBefore(o,u)}}(window,document,"eI45JqYgtuwjSTN5","delighted");
        delighted.survey({recurringPeriod: 1});
      `,
    };
  }


  render() {
    return (
      <html lang="en">
        <Head>
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/static/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/static/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/static/favicon-16x16.png"
          />
          <link rel="manifest" href="/static/site.webmanifest" />
          <link
            rel="mask-icon"
            href="/static/safari-pinned-tab.svg"
            color="#5bbad5"
          />
          <meta name="msapplication-TileColor" content="#2d89ef" />
          <meta name="theme-color" content="#ffffff" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          {this.props.stylesheets.map((sheet, i) => (
            <style
              className="_styletron_hydrate_"
              dangerouslySetInnerHTML={{ __html: sheet.css }}
              media={sheet.attrs.media || ""}
              key={i}
            />
          ))}
          <style>
            {`
            body {
              font-family: Arial,Helvetica Neue,Helvetica,sans-serif;
              line-height: 1.5;
            }
          `}
          </style>
        </Head>
        <body>
          <Main />
          <NextScript />
          {this.props.isProduction && (
            <React.Fragment>
              <script
                async
                src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              />
              <script dangerouslySetInnerHTML={this.setGoogleTags()} />
              <script dangerouslySetInnerHTML={this.initDelighted()} />
            </React.Fragment>
          )}
        </body>
      </html>
    );
  }
}
