import Head from 'next/head'
import { useState, Fragment } from 'react'
import Cookies from 'js-cookie'

import Begin from '../components/begin'
import Footer from '../components/footer'
import Header from '../components/header'
import Main from '../components/main'

export default function IndexPage() {
    const [permissionGranted, setPermissionGranted] = useState(false)

    if (Cookies.get('lat') && Cookies.get('lon') && !permissionGranted) {
        setPermissionGranted(true)
    }

    return (
        <Fragment>
            <Head>
                <title>Should I Burn?</title>
                <meta
                    name="viewport"
                    content="initial-scale=1.0, width=device-width"
                />
                <link
                    rel="apple-touch-icon"
                    sizes="180x180"
                    href="/apple-touch-icon.png"
                />
                <link
                    rel="icon"
                    type="image/png"
                    sizes="32x32"
                    href="/favicon-32x32.png"
                />
                <link
                    rel="icon"
                    type="image/png"
                    sizes="16x16"
                    href="/favicon-16x16.png"
                />
                <link rel="manifest" href="/site.webmanifest" />
                <link
                    rel="mask-icon"
                    href="/safari-pinned-tab.svg"
                    color="#5045e4"
                />
                <meta name="msapplication-TileColor" content="#5045e4" />
                <meta name="theme-color" content="#ffffff"></meta>
            </Head>
            <section className="w-full px-6 pb-12 antialiased bg-white">
                <div className="mx-auto max-w-7xl">
                    <Header />

                    {permissionGranted ? (
                        <Main />
                    ) : (
                        <Begin setPermissionGranted={setPermissionGranted} />
                    )}
                </div>
            </section>

            <Footer />
        </Fragment>
    )
}
