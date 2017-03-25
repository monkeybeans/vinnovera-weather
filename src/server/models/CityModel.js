import readline from 'readline';
import fs from 'fs';

class CityModel {
  constructor(dataPath) {
    this.dataPath = dataPath;
    this.dataModel = {};
  }

  buildDataModel() {
    const startTime = Date.now();
    console.log(`Building data model for cities...`);
    const lineReader = readline.createInterface({
      input: fs.createReadStream(this.dataPath),
    });

    lineReader.on('line', function (line) {
      const data = JSON.parse(line);

      const id = data._id;
      const countryCode = data.country.toLowerCase();
      const city = data.name.toLowerCase();

      if (!this.dataModel[countryCode]) { this.dataModel[countryCode] = {}; }

      this.dataModel[countryCode][city] = id;
    }.bind(this));

    console.log(`...done in ${(Date.now() - startTime) / 1000} s`);
  }

  match(countryCode, city) {
    return this.dataModel[countryCode.toLowerCase()][city.toLowerCase()] || null;
  }
}

export default CityModel;
