import Head from 'next/head'
import { Fragment } from 'react'

import Footer from '../components/footer'
import Header from '../components/header'

export default function ContactPage() {
    return (
        <Fragment>
            <Head>
                <title>Contact | ShouldIBurn.com</title>
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
                                className="text-fire-600"
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
