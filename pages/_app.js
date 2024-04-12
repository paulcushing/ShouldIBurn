import Head from 'next/head'
import { useEffect } from 'react'
import '../styles/globals.css'

function MyApp({ Component, pageProps, err }) {
    useEffect(() => {
        if (
            !('serviceWorker' in navigator) ||
            process.env.NODE_ENV !== 'production'
        ) {
            console.warn(
                'No ServiceWorker present - Progressive Web App support is disabled'
            )
            return
        }
    }, [])

    return (
        <>
            <Head>
                <meta
                    name="viewport"
                    content="initial-scale=1.0, width=device-width"
                />
            </Head>
            <Component {...pageProps} err={err} />
        </>
    )
}

export default MyApp
