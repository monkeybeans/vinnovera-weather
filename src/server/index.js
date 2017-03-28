import express from 'express';
import bodyParser from 'body-parser';
import CityIdMap from './data/CityIdMap';
import WeatherCache from './data/WeatherCache';

const PORT = 8085;

const weatherCache = new WeatherCache();
weatherCache.updateCityIds(2673730, 2711537, 2692969, 5128638, 2950159, 2643743);
weatherCache.startUpdater();

const cityIdMap = new CityIdMap(`${__dirname}/data/city.list.jsons.txt`);
cityIdMap.buildDataModel();

const app = express();

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
  console.log(`Listening http://localhost:${PORT}, time: ${new Date().toString()}`);
});
