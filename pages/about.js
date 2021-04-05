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

                    <div className="container max-w-lg px-4 py-24 mx-auto text-left md:max-w-80 text-center">
                        <h1 className="text-5xl font-extrabold leading-10 tracking-tight text-gray-900 text-center sm:leading-none md:text-6xl lg:text-7xl mb-12">
                            About
                        </h1>
                        <p className="text-left py-4"><span className="text-indigo-600">ShouldIBurn.com</span> is a simple application for helping you determine if the conditions are right for you to burn weeds or have a fire on your property. The common standards for the best conditions to burn are:</p>
                        <table className="table-auto border border-indigo-600 w-full mt-6 mb-6">
                            <thead>
                                <tr>
                                <th>Wind Speed</th>
                                <th>Air Quality Index</th>
                                </tr>
                            </thead>
                            <tbody className="border border-indigo-600">
                                <tr>
                                <td className="border border-indigo-600">{'Speed < 10 MPH'}</td>
                                <td className="border border-indigo-600">{'AQI < 60'}</td>
                                </tr>
                            </tbody>
                            </table>
                            <p className="text-left py-4">With any burn operation, you are responsible for ensuring your safety and the safety of the property and other people around you. This application is only a tool to inform you about what the conditions should be on the day you may want to burn. You must evaluate the real local conditions at the time you decide to burn.</p>
                            <p className="text-left py-4">You are responsible for ensuring that you meet all of the permitting and licensing required in your area to burn on your property.
                            </p>
                        <p className="text-left py-4">
                            This is an open source project built by Software Engineer,{' '}
                            <a
                                className="text-indigo-600"
                                href="https://github.com/paulcushing"
                                target="_blank"
                                rel="noreferrer"
                            >
                                Paul Cushing
                            </a>
                            . It's built using data from the OpenWeather and AirNow APIs.
                        </p>
                    </div>
                </div>
            </section>

            <Footer />
        </Fragment>
    )
}
