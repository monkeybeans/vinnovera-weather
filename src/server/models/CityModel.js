class City {
  constructor(cityId, countryCode, name) {
    this.country_code = countryCode.toLowerCase();
    this.city_id = cityId;
    this.name = name.toLowerCase();
  }
}

export default City;
