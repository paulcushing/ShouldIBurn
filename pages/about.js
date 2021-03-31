import Head from 'next/head'
import { Fragment } from 'react'

import Footer from '../src/components/Footer'
import Header from '../src/components/Header'

export default function AboutPage() {
    return (
        <Fragment>
            <Head>
                <title>Should I Burn? | About</title>
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
                            About
                        </h1>
                        <p>
                            This is a project built by Software Engineer,{' '}
                            <a
                                className="text-indigo-600"
                                href="https://github.com/paulcushing"
                                target="_blank"
                                rel="noreferrer"
                            >
                                Paul Cushing
                            </a>
                            . It's built as a simple NextJS (React) app that
                            uses the OpenWeather and AirNow APIs.
                        </p>
                    </div>
                </div>
            </section>

            <Footer />
        </Fragment>
    )
}
