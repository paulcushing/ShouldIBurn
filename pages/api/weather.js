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
    const openWeatherAirUrl = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${process.env.OW_API_KEY}`;

    const weather = new Promise((resolve, reject) => {
        fetch(openWeatherUrl)
            .then((response) => response.json())
            .then((data) => {
                //res.status(200).json(data)
                resolve(data)
            })
            .catch((err) => {
                console.log(err)
                //res.status(500)
                resolve()
            })
    })

    const air = new Promise((resolve, reject) => {
        fetch(openWeatherAirUrl)
            .then((response) => response.json())
            .then((data) => {
                resolve(data)
            })
            .catch((err) => {
                console.log(err)
                //res.status(500)
                resolve()
            })
    })

    return Promise.all([weather, air]).then(values => {
        res.status(200).json({
            weather: values[0],
            air: values[1]
        })
    })
}
