import api from 'superagent';
import CityModel from '../models/CityModel';

const ORIGIN = window.location.origin;
const API_PATH = 'api/v1';

const URL_API_CITY_ID = `${ORIGIN}/${API_PATH}/cities`;
const URL_API_WEATHERS = `${ORIGIN}/${API_PATH}/weather`;


export function fetchCityId(cityName) {
  return new Promise((resolve, reject) => {
    api
    .get(`${URL_API_CITY_ID}/${cityName}`)
    .end((err, res) => {
      if (err) {
        reject(err);
      } else {
        const data = res.body;
        resolve(data.map(d => new CityModel(d.city_id, d.name, d.country_code)));
      }
    });
  });
}

export function fetchWeather(cityId) {
  return new Promise((resolve, reject) => {
    api
    .get(`${URL_API_WEATHERS}/${cityId}`)
    .end((err, res) => {
      if (err) {
        reject(err);
      } else {
        const data = JSON.stringify(res.body);
        resolve({
          id: data.id,
          cityName: data.city_name,
          country: data.country,
          temprature: data.temprature,
          weatherTerm: data.weather_term,
        });
      }
    });
  });
}
