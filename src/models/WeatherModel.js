export default class WeatherModel {
  constructor(cityId, cityName, countryName, temprature, icon) {
    this.cityId = cityId;
    this.cityName = cityName;
    this.countryName = countryName;
    this.temprature = temprature;
    this.icon = icon;
  }
}
