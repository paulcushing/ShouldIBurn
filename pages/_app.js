import Head from 'next/head'
import { useEffect } from 'react'
import { init } from '../utils/sentry'
import { Workbox } from "workbox-window";
import '../styles/globals.css'

init()

function MyApp({ Component, pageProps, err }) {
    useEffect(() => {
        if (
          !("serviceWorker" in navigator) ||
          process.env.NODE_ENV !== "production"
        ) {
          console.warn("Progressive Web App support is disabled");
          return;
        }
    const wb = new Workbox("sw.js", { scope: "/" });
        wb.register();
      }, []);

    return (
        <>
            <Head>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <Component {...pageProps} err={err} />
        </>
    )
}

export default MyApp
