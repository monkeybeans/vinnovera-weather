import request from 'request';


const OPW_API_KEY = '7fbb5ff0d0aa5e2594b9c4eae2c02f07_INACTIVE';
const OPW_API_QUERY = `APPID=${OPW_API_KEY}`;
const OPW_WEATHER_URL = `http://api.openweathermap.org/data/2.5/group?${OPW_API_QUERY}&units=metric`;

const CACHE_BUST_MS = 1000 * 60 * 60 * 11;
class WeatherCache {

  constructor() {
    this.weatherCache = null;
    this.cityIds = [];
  }

  updateCityIds(...ids) {
    ids.forEach(function(id) {
      if (this.cityIds.indexOf(id) === -1 ) {
        this.cityIds.push(id);
      }
    }.bind(this));

    if (this.cityIds.lenght > 20 ) {
      this.cityIds.reverse().pop().reverse();
    }
  }

  startUpdater(cacheBustMs = CACHE_BUST_MS) {
    if (cacheBustMs < CACHE_BUST_MS) {
      console.error('CACHE BUST MS TIME TO LOW: ', CACHE_BUST_MS);
      //throw new Error(`CACHE BUST MS TIME TO LOW: ${CACHE_BUST_MS}`);
    }

    this.updateWatherCache();
    this.intervallId = setInterval(this.updateWatherCache.bind(this), cacheBustMs);
  }

  stopUpdater() {
    clearInterval(this.intervallId);
  }

  updateWatherCache() {
    const now = new Date();

    const weatherUrl = `${OPW_WEATHER_URL}&id=${this.cityIds.join(',')}`;
    if (now.getMilliseconds() === 0 && now.getSeconds() === 0 && (now.getMinutes % 11 === 0)) {
      request(weatherUrl, function(err, response, body) {
        if (err) {
          console.log('ERROR: could not update the weather cache');
        } else {
          console.log('INFO: weather cache is now updated');
          this.weatherCache = body;
        }
      }.bind(this));
    } else {
      console.log(`Would have requested: ${weatherUrl}`);
    }
  }

  getCache(cityId) {
    //replace getTestData() with this.weatherCache;

    const cityData = getTestData().list.filter(d => d.id == cityId).pop() || {};
    return cityData;
  }
}

export default WeatherCache;


function getTestData() {
  return {
      "cnt": 3,
      "list": [
          {
              "coord": {
                  "lon": 10,
                  "lat": 53.55
              },
              "sys": {
                  "type": 1,
                  "id": 4883,
                  "message": 0.0053,
                  "country": "DE",
                  "sunrise": 1490418501,
                  "sunset": 1490463846
              },
              "weather": [
                  {
                      "id": 803,
                      "main": "Clouds",
                      "description": "broken clouds",
                      "icon": "04d"
                  }
              ],
              "main": {
                  "temp": 10.56,
                  "pressure": 1026,
                  "humidity": 71,
                  "temp_min": 10,
                  "temp_max": 11
              },
              "visibility": 10000,
              "wind": {
                  "speed": 4.6,
                  "deg": 310
              },
              "clouds": {
                  "all": 75
              },
              "dt": 1490463220,
              "id": 2911298,
              "name": "Hamburg"
          },
          {
              "coord": {
                  "lon": 10.45,
                  "lat": 54.03
              },
              "sys": {
                  "type": 1,
                  "id": 4903,
                  "message": 0.0123,
                  "country": "DE",
                  "sunrise": 1490418376,
                  "sunset": 1490463756
              },
              "weather": [
                  {
                      "id": 800,
                      "main": "Clear",
                      "description": "clear sky",
                      "icon": "01d"
                  }
              ],
              "main": {
                  "temp": 10.47,
                  "pressure": 1026,
                  "humidity": 57,
                  "temp_min": 10,
                  "temp_max": 11
              },
              "visibility": 10000,
              "wind": {
                  "speed": 1.5,
                  "deg": 300
              },
              "clouds": {
                  "all": 0
              },
              "dt": 1490463220,
              "id": 2950158,
              "name": "Berlin"
          },
          {
              "coord": {
                  "lon": 18.06,
                  "lat": 59.33
              },
              "sys": {
                  "type": 1,
                  "id": 5420,
                  "message": 0.003,
                  "country": "SE",
                  "sunrise": 1490416341,
                  "sunset": 1490462155
              },
              "weather": [
                  {
                      "id": 800,
                      "main": "Clear",
                      "description": "clear sky",
                      "icon": "01d"
                  }
              ],
              "main": {
                  "temp": 7.46,
                  "pressure": 1020,
                  "humidity": 39,
                  "temp_min": 7,
                  "temp_max": 8
              },
              "visibility": 10000,
              "wind": {
                  "speed": 3.1,
                  "deg": 320
              },
              "clouds": {
                  "all": 0
              },
              "dt": 1490463220,
              "id": 2673730,
              "name": "Stockholm"
          }
      ]
  }
}
