import express from 'express';
import CityIdMap from './data/CityIdMap';
import bodyParser from 'body-parser';
import request from 'request';
import CityModel from './models/CityModel';
import WeatherCache from './data/WeatherCache';


const BUST_WEATHER_CACHE_MS = 1000 * 10;

const PORT = 8085;


const weatherCache = new WeatherCache();
weatherCache.startUpdater();

const cityIdMap = new CityIdMap(`${__dirname}/data/city.list.jsons.txt`);
cityIdMap.buildDataModel();


const app = express();

const cityIds = [];


app
  .use(bodyParser.json())
  .use('/', express.static(`${__dirname}/assets`));

app
  .get('/ping', (req, res) => {
    res.send('pong');
  })
  .get('/api/v1/weather/:city_id', (req, res) => {
    console.log('INFO/weather/:city_id');

    const cityId = req.params.city_id;

    weatherCache.updateCityIds(cityId);

    res.json(weatherCache.getCache(cityId));
  })
  .get('/api/v1/cities/:city?', (req, res) => {
    const city = req.params.city || '';

    const matches = cityIdMap.match(city);

    res.json(matches);
  });


app.listen(PORT, () => {
  console.log(`Listening http://localhost:${PORT}`);
});
