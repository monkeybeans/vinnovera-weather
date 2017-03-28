import api from 'superagent';
import CityModel from '../../models/CityModel';
import WeatherModel from '../../models/WeatherModel';

const ORIGIN = window.location.origin;
const API_PATH = 'api/v1';

const URL_API_CITY_ID = `${ORIGIN}/${API_PATH}/cities`;
const URL_API_WEATHER = `${ORIGIN}/${API_PATH}/weather`;


export function fetchCityId(cityName) {
  return new Promise((resolve, reject) => {
    api
    .get(`${URL_API_CITY_ID}/${cityName}`)
    .end((err, res) => {
      if (err) {
        reject(err);
      } else {
        const data = res.body;
        resolve(data.map(d => Object.assign(new CityModel(), d)));
      }
    });
  });
}

export function fetchWeather(cityId) {
  return new Promise((resolve, reject) => {
    api
    .get(`${URL_API_WEATHER}/${cityId}`)
    .end((err, res) => {
      if (err) {
        reject(err);
      } else {
        const data = res.body;
        resolve(Object.assign(new WeatherModel(), data));
      }
    });
  });
}
