require('dotenv').config()

const axios = require('axios')

const readline = require('readline')

const scanf = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

async function main() {
  console.log(`------------------------------------`)
  console.log(`1 - Entrar no sistema`)
  console.log(`2 - Sair`)
  console.log(`------------------------------------`)

  scanf.question('', async function (op) {
    console.clear()
    switch (op) {
      case '1':
        console.log(`------------------------------------`)
        console.log('Digite uma cidade:')
        console.log(`------------------------------------`)
        scanf.question('', async function (city) {
          console.clear()

          await LogLat(city).then(result => {
            return FeelsLike_Description(result)
          })

          main()
        })
        break

      case '2':
        console.clear()
        process.exit()

      default:
        console.log(`Insira um valor valido!`)
        console.clear()
        main()
    }
  })

  async function LogLat(city) {
    const { appid, url } = process.env
    const end1 = `${url}?q=${city}&appid=${appid}`
    const resultado = await axios
      .get(end1)
      .then(result => result['data'])
      .then(result => {
        console.log(`------------------------------------`)
        console.log(`País (Sigla): ${result[0].country}`)
        console.log(`Estado: ${result[0].state}`)
        console.log(`Cidade: ${city}`)
        console.log(`Latitude: ${result[0].lat}`)
        console.log(`Longitude: ${result[0].lon}`)
        return [result[0].lat, result[0].lon]
      })
    return resultado
  }

  async function FeelsLike_Description(lista) {
    const { appid, url2, language } = process.env
    const end2 = `${url2}?&lat=${lista[0]}&lon=${lista[1]}&appid=${appid}&lang=${language}`
    const resultado = await axios
      .get(end2)
      .then(result => result['data'])
      .then(result => {
        console.log(`------------------------------------`)
        console.log(`Descrição: ${result.weather[0].description}`)
        return result
      })
      .then(result => result.main)
      .then(result => {
        console.log(`------------------------------------`)
        console.log(
          `Sensação térmica (Kelvin): ${Math.round(result.feels_like)} k`
        )
        console.log(
          `Sensação térmica (Celsius): ${Math.round(result.feels_like - 273)}°C`
        )
        console.log(`------------------------------------`)
        return result.feels_like
      })
    return resultado
  }
}
main()
