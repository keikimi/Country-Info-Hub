// countryManager.js

const fs = require('fs');
const path = require('path');

class Country {
  constructor() {
    this.filePath = path.join(__dirname, 'countries.json');
    this.countries = this.loadCountries();
  }

  loadCountries() {
    if (!fs.existsSync(this.filePath)) {
      fs.writeFileSync(this.filePath, JSON.stringify([]));
    }
    const data = fs.readFileSync(this.filePath);
    return JSON.parse(data);
  }

  saveCountries() {
    fs.writeFileSync(this.filePath, JSON.stringify(this.countries, null, 2));
  }

  create(country) {
    const exists = this.countries.find(c => c.name.common === country.name.common);
    if (exists) {
      throw new Error('Country already exists.');
    }
    this.countries.push(country);
    this.saveCountries();
  }

  read(countryName) {
    return this.countries.find(c => c.name.common === countryName);
  }

  update(countryName, updates) {
    const country1 = this.countries.find(c => c.name.common === countryName);
    if (!country1) {
      throw new Error('Country not found.');
    }
    Object.keys(updates).forEach(key => {
      country1[key] = updates[key];
    });
    this.saveCountries();
  }

  delete(countryName) {
    const index = this.countries.findIndex(c => c.name.common === countryName);
    if (index === -1) {
      throw new Error('Country not found.');
    }
    this.countries.splice(index, 1);
    this.saveCountries();
  }
}

module.exports = Country;
