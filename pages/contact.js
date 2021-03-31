import Head from 'next/head'
import { Fragment } from 'react'

import Footer from '../src/components/Footer'
import Header from '../src/components/Header'

export default function ContactPage() {
    return (
        <Fragment>
            <Head>
                <title>Should I Burn? | Contact</title>
                <meta
                    name="viewport"
                    content="initial-scale=1.0, width=device-width"
                />
            </Head>
            <section className="w-full px-6 pb-12 antialiased bg-white">
                <div className="mx-auto max-w-7xl">
                    <Header />

                    <div className="container max-w-lg px-4 py-32 mx-auto text-left md:max-w-none text-center">
                        <h1 className="text-5xl font-extrabold leading-10 tracking-tight text-left text-gray-900 text-center sm:leading-none md:text-6xl lg:text-7xl">
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
