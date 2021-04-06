import Head from 'next/head'
import { Fragment } from 'react'

import Footer from '../components/footer'
import Header from '../components/header'

export default function ContactPage() {
    return (
        <Fragment>
            <Head>
                <title>Should I Burn? | Contact</title>
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

                    <div className="container max-w-lg px-4 py-8 mx-auto text-left md:max-w-none text-center">
                        <h1 className="text-5xl font-extrabold leading-10 tracking-tight text-gray-900 text-center sm:leading-none md:text-6xl lg:text-7xl mb-12">
                            Contact
                        </h1>
                        <p>
                            Email{' '}
                            <a
                                className="text-indigo-600"
                                href="email: pcushing+burn@gmail.com"
                                target="_blank"
                                rel="noreferrer"
                            >
                                Paul Cushing
                            </a>{' '}
                            with any questions.
                        </p>
                    </div>
                </div>
            </section>

            <Footer />
        </Fragment>
    )
}
