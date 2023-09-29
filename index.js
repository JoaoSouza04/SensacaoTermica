require('dotenv').config()

const axios = require('axios')

const scanf = require('scanf')

async function main() {

  while (true) {

    console.log(`------------------------------------`);
    console.log(`1 - Entrar no sistema`)
    console.log(`2 - Sair`)
    console.log(`------------------------------------`);
    let op = scanf('%s')
    console.clear();
    switch (op) {

      case '1':
        console.log(`------------------------------------`);
        console.log('Digite uma cidade:');
        console.log(`------------------------------------`);
        let city = scanf('%s')
        console.clear();

        await LogLat(city).then((result) => {

          return FeelsLike(result)
        })

        break;

      case '2':
        console.clear();
        process.exit();

      default:
        console.log(`Insira um valor valido!`);
        console.clear();
    }

    async function LogLat(city) {

      const { appid, units, cnt, language, url } = process.env;
      const end1 = `${url}?appid=${appid}&q=${city}&units=${units}&cnt=${cnt}&lang=${language}`;

      const resultado = await axios.get(end1).then((result) => {
        return result['data'];
      }).then((result) => {
        return result.city
      }).then((result) => {
        return result.coord
      }).then((result) => {
        console.log(`------------------------------------`);
        console.log(`Cidade: ${city}`);
        console.log(`Latitude: ${result.lat}`)
        console.log(`Longitude: ${result.lon}`)
        return [result.lat, result.lon]
      })
      return resultado
    }

    async function FeelsLike(lista) {
      const { appid, url2 } = process.env
      const end2 = `${url2}?&lat=${lista[0]}&lon=${lista[1]}&appid=${appid}`
      await axios.get(end2).then((result) => {
        return result['data']
      }).then((result) => {
        return result.main
      }).then((result) => {
        console.log(`Sensação térmica (Kelvin): ${Math.round(result.feels_like)} k`)
        console.log(`Sensação térmica (Celsius): ${Math.round((result.feels_like) - 273)}°C`)
        console.log(`------------------------------------`);
        return
      })
    }
    
  }

}
main();