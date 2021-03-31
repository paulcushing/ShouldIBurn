import Head from 'next/head'
import { Fragment } from 'react'

import Footer from '../components/footer'
import Header from '../components/header'

export default function AboutPage() {
    return (
        <Fragment>
            <Head>
                <title>Should I Burn? | About</title>
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
