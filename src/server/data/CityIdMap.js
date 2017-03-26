import readline from 'readline';
import fs from 'fs';
import CityModel from '../models/CityModel';

class CityIdMap {
  constructor(dataPath) {
    this.dataPath = dataPath;
    this.dataModel = {};
  }

  buildDataModel() {
    const startTime = Date.now();
    const lineReader = readline.createInterface({
      input: fs.createReadStream(this.dataPath),
    });

    const self = this;
    lineReader.on('line', (line) => {
      const data = JSON.parse(line);
      const id = data._id;
      const countryCode = data.country;
      const city = data.name.toLowerCase();

      const cityModel = new CityModel(id, countryCode, city);

      if (!self.dataModel[city]) {
        self.dataModel[city] = [];
      }

      self.dataModel[city].push(cityModel);
    });

    lineReader.on('close', () => {
      console.log(`Building data model for cities done in ${(Date.now() - startTime) / 1000} s`);
    });
  }

  match(city) {
    return this.dataModel[city.toLowerCase()] || [];
  }
}

export default CityIdMap;
