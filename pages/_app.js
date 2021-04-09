import { init } from '../utils/sentry'
import '../styles/globals.css'

init()

function MyApp({ Component, pageProps, err }) {
    return <Component {...pageProps} err={err} />
}

export default MyApp
