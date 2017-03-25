import express from 'express';
import CityModel from './models/CityModel';
import bodyParser from 'body-parser';
import request from 'request';
import City from './models/City';
import WeatherCache from './data/WeatherCache';


const BUST_WEATHER_CACHE_MS = 1000 * 10;

const PORT = 8085;


const weatherCache = new WeatherCache();
weatherCache.startUpdater();

const cityModel = new CityModel(`${__dirname}/data/city.list.jsons.txt`);
cityModel.buildDataModel();


const app = express();

let cityIds = [];


app
  .use(bodyParser.json());

app
  .get('/ping', (req, res) => {
    res.send('pong');
  })
  .get('/weather/:city_id', (req, res) => {
    console.log('INFO/weather/:city_id');

    const cityId = req.params.city_id;

    weatherCache.updateCityIds(cityId);

    res.json(weatherCache.getCache(cityId));
  })
  .get('/cities/:country_code/:city', (req, res) => {
    const city = req.params.city;
    const countryCode = req.params.country_code;

    const match = cityModel.match(countryCode, city);

    if (match) {
      res.json(new City(match, countryCode, city));
    } else {
      res.json({});
    }

  });


app.listen(PORT, () => {
  console.log(`Listening http://localhost:${PORT}`);
});
