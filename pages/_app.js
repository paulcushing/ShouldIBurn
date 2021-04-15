import Head from 'next/head'
import { init } from '../utils/sentry'
import '../styles/globals.css'

init()

function MyApp({ Component, pageProps, err }) {
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
