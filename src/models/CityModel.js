export default class CityModel {
  constructor(id, name, countryCode) {
    this.id = id;
    this.name = name.toLowerCase();
    this.countryCode = countryCode.toLowerCase();
  }

  equals(instance) {
    const self = this;
    return ['name', 'countryCode']
      .every(k => instance[k] === self[k]);
  }

  valid() {
    const self = this;
    return Object
      .keys(self)
      .every(k => self[k] !== null && self[k] !== undefined && self[k].length > 0);
  }
}
