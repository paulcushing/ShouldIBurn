const fetch = require('node-fetch')

export default (req, res) => {
    if (!req.body.zipcode && !req.body.city) {
        res.status(400).json({ error: 'Missing required parameters' })
        return
    }

    const zip = req.body.zipcode
    const city = req.body.city
    let url

    if (zip) {
        url = `http://api.openweathermap.org/geo/1.0/zip?zip=${zip}&appid=${process.env.OW_API_KEY}`
    } else if (city) {
        const formattedCity = city.replace(/\s/g, '') + ',US'
        url = `http://api.openweathermap.org/geo/1.0/direct?q=${formattedCity}&limit=1&appid=${process.env.OW_API_KEY}`
        console.log(url)
    }

    return new Promise((resolve, reject) => {
        fetch(url)
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
