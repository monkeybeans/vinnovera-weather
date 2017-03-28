export default class WeatherModel {
  constructor(cityId, cityName, countryName, temprature, icon) {
    this.cityId = cityId || '';
    this.cityName = cityName ? cityName.toLowerCase() : '';
    this.countryName = countryName ? countryName.toLowerCase() : '';
    this.temprature = temprature || '';
    this.icon = icon || '';
  }

  valid() {
    const self = this;
    return ['cityName', 'countryName', 'temprature']
      .every(k => self[k] !== '');
  }
}
