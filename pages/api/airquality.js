const fetch = require('node-fetch')

export default (req, res) => {
    if (!req.body.latitude || !req.body.longitude) {
        res.status(400).json({ error: 'Missing required parameters' })
        return
    }

    const lat = req.body.latitude
    const lon = req.body.longitude

    const now = new Date()
    const year = now.getFullYear()
    const month = ('0' + (now.getMonth() + 1)).slice(-2)
    const date = ('0' + now.getDate()).slice(-2)
    const todayDate = year + '-' + month + '-' + date

    const airNowUrl = `https://www.airnowapi.org/aq/forecast/latLong/?format=application/json&latitude=${lat}&longitude=${lon}&date=${todayDate}&distance=25&API_KEY=${process.env.AN_API_KEY}`

    return new Promise((resolve, reject) => {
        fetch(airNowUrl)
            .then((response) => response.json())
            .then((data) => {
                //console.log(data)
                res.status(200).json(data[0])
                resolve()
            })
            .catch((err) => {
                console.log(err)
                res.status(500)
                resolve()
            })
    })
}
