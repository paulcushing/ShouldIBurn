import { init } from '../../utils/sentry'

init()

const fetch = require('node-fetch')

export default (req, res) => {
    if (!req.body.latitude || !req.body.longitude) {
        res.status(400).json({ error: 'Missing required parameters' })
        return
    }

    const lat = req.body.latitude
    const lon = req.body.longitude
    const openWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${process.env.OW_API_KEY}`

    return new Promise((resolve, reject) => {
        fetch(openWeatherUrl)
            .then((response) => response.json())
            .then((data) => {
                res.status(200).json(data)
                resolve()
            })
            .catch((err) => {
                console.log(err)
                res.status(500)
                resolve()
            })
    })
}
