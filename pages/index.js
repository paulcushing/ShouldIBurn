import Head from 'next/head'
import { Fragment } from 'react'

import Footer from '../components/footer'
import Header from '../components/header'
import Main from '../components/main'

export default function IndexPage() {
    return (
        <Fragment>
            <Head>
                <title>Should I Burn?</title>
                <meta
                    name="viewport"
                    content="initial-scale=1.0, width=device-width"
                />
            </Head>
            <section className="w-full px-6 pb-12 antialiased bg-white">
                <div className="mx-auto max-w-7xl">
                    <Header />

                    <Main />
                </div>
            </section>

            <Footer />
        </Fragment>
    )
}
