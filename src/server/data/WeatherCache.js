import request from 'request';
import { WeatherModel } from '../../models';

const OPW_API_KEY = '7fbb5ff0d0aa5e2594b9c4eae2c02f07';
const OPW_API_QUERY = `APPID=${OPW_API_KEY}`;
const OPW_WEATHER_URL = `http://api.openweathermap.org/data/2.5/group?${OPW_API_QUERY}&units=metric`;

const CACHE_BUST_MS = 1000 * 60 * 11;
class WeatherCache {

  constructor() {
    this.weatherCache = null;
    this.cityIds = [];
  }

  updateCityIds(...ids) {
    const self = this;
    ids.forEach((id) => {
      if (self.cityIds.indexOf(id) === -1) {
        self.cityIds.push(id);
      }
    });

    if (this.cityIds.lenght > 20) {
      this.cityIds.reverse().pop().reverse();
    }
  }

  startUpdater(cacheBustMs = CACHE_BUST_MS) {
    if (cacheBustMs < CACHE_BUST_MS) {
      throw new Error(`CACHE BUST MS TIME TO LOW: ${cacheBustMs}`);
    }

    console.info('Staring timer for caching weather, intervall(min): ', cacheBustMs / 1000 / 60);
    // this.updateWatherCache();
    this.intervallId = setInterval(this.updateWatherCache.bind(this), cacheBustMs);
  }

  stopUpdater() {
    clearInterval(this.intervallId);
  }

  updateWatherCache() {
    const now = new Date();
    const self = this;

    if (this.cityIds.length !== 0) {
      const weatherUrl = `${OPW_WEATHER_URL}&id=${this.cityIds.join(',')}`;
      request(weatherUrl, (err, response, body) => {
        console.info('===> Request for weather: ', now);
        if (err || response.statusCode !== 200) {
          console.error(`<=== Could not update the weather cache, status = ${response.statusCode}, url = ${weatherUrl}`);
        } else {
          console.info('<=== Weather cache is now updated');
          self.weatherCache = JSON.parse(body);
        }
      });
    } else {
      console.info('skipping update as there are no requested city ids');
    }
  }

  getCache(cityId) {
    // const cd = getTestData().list.filter(d => d.id == cityId).pop() || {};
    const cd = (this.weatherCache && this.weatherCache.list.filter(d => d.id == cityId).pop()) || {};

    return new WeatherModel(cd.id, cd.name, cd.sys && cd.sys.country, cd.main && cd.main.temp, cd.weather && cd.weather[0].icon);
  }
}

export default WeatherCache;


function getTestData() {
  return {
    cnt: 3,
    list: [
      {
        coord: {
          lon: 10,
          lat: 53.55,
        },
        sys: {
          type: 1,
          id: 4883,
          message: 0.0053,
          country: 'DE',
          sunrise: 1490418501,
          sunset: 1490463846,
        },
        weather: [
          {
            id: 803,
            main: 'Clouds',
            description: 'broken clouds',
            icon: '04d',
          },
        ],
        main: {
          temp: 10.56,
          pressure: 1026,
          humidity: 71,
          temp_min: 10,
          temp_max: 11,
        },
        visibility: 10000,
        wind: {
          speed: 4.6,
          deg: 310,
        },
        clouds: {
          all: 75,
        },
        dt: 1490463220,
        id: 2911298,
        name: 'Hamburg',
      },
      {
        coord: {
          lon: 10.45,
          lat: 54.03,
        },
        sys: {
          type: 1,
          id: 4903,
          message: 0.0123,
          country: 'DE',
          sunrise: 1490418376,
          sunset: 1490463756,
        },
        weather: [
          {
            id: 800,
            main: 'Clear',
            description: 'clear sky',
            icon: '01d',
          },
        ],
        main: {
          temp: 10.47,
          pressure: 1026,
          humidity: 57,
          temp_min: 10,
          temp_max: 11,
        },
        visibility: 10000,
        wind: {
          speed: 1.5,
          deg: 300,
        },
        clouds: {
          all: 0,
        },
        dt: 1490463220,
        id: 2950158,
        name: 'Berlin',
      },
      {
        coord: {
          lon: 18.06,
          lat: 59.33,
        },
        sys: {
          type: 1,
          id: 5420,
          message: 0.003,
          country: 'SE',
          sunrise: 1490416341,
          sunset: 1490462155,
        },
        weather: [
          {
            id: 800,
            main: 'Clear',
            description: 'clear sky',
            icon: '01d',
          },
        ],
        main: {
          temp: 7.46,
          pressure: 1020,
          humidity: 39,
          temp_min: 7,
          temp_max: 8,
        },
        visibility: 10000,
        wind: {
          speed: 3.1,
          deg: 320,
        },
        clouds: {
          all: 0,
        },
        dt: 1490463220,
        id: 2673730,
        name: 'Stockholm',
      },
    ],
  };
}
