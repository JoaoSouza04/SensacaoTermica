require('dotenv').config()

const axios = require('axios')
const express = require('express')
const app = express()

require('dotenv').config()

app.use(express.json())

app.get('/api/weather/:location', async (req, res) => {
  try {
    const { api1_url, api2_url, appid, language } = process.env
    const { location } = req.params

    const weather_url = `${api1_url}?q=${location}&appid=${appid}&lang=${language}`
    const weather = await axios.get(weather_url)
    const { lat, lon, name, country, state } = weather.data[0]

    const feelsLike_url = `${api2_url}?&lat=${lat}&lon=${lon}&appid=${appid}&lang=${language}`
    const feelsLike = await axios.get(feelsLike_url)
    const { description } = feelsLike.data.weather[0]
    let { temp, feels_like } = feelsLike.data.main
    temp -= 273
    feels_like -= 273

    const result = {
      Nome: name,
      País: country,
      Estado: state,
      Localização: {
        Latitude: lat,
        Longitude: lon
      },
      Temperatura: `${temp.toFixed(1)}°C`,
      Sensação: `${feels_like.toFixed(1)}°C`,
      Descrição: description
    }

    res.json(result)
  } catch (e) {
    console.error(e)
    res.status(400).send(e.message)
  }
})

app.listen(process.env.PORT, () =>
  console.log(`Server listening on port ${process.env.PORT}`)
)
