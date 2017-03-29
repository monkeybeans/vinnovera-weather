import React from 'react';
import { connect } from 'react-redux';
import { fetchCityId } from '../../api';
import { addCity } from '../../data-flow';

const capitalize = string => string ? string.replace(/\b\w/g, l => l.toUpperCase()) : '';

class CityInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      location: '',
      selectedCityId: null,
      cityModels: [],
    };

    this.updateLocation = this.updateLocation.bind(this);
    this.onAddCity = this.onAddCity.bind(this);
    this.onChooseCity = this.onChooseCity.bind(this);
    this.buildInputAndAddCity = this.buildInputAndAddCity.bind(this);
    this.buildSuggestions = this.buildSuggestions.bind(this);
  }

  onAddCity() {
    const choosenCityModel = this.getCityModel(this.state.selectedCityId);

    if (!choosenCityModel || !choosenCityModel.valid()) { return; }

    addCity(this.props.dispatch, this.state.selectedCityId);
    this.setState({
      inputCity: '',
      inputCountryCode: '',
      selectedCityId: null,
      cityModels: [],
    });
  }

  onChooseCity(e) {
    e.preventDefault();

    const elem = e.currentTarget;
    const cityId = elem.value;
    const model = this.getCityModel(cityId);

    this.setState({
      inputCity: model.name,
      inputCountryCode: model.countryCode,
      selectedCityId: cityId,
    });
  }

  getCityModel(cityId) {
    return this.state.cityModels.filter(m => m.id === Number.parseInt(cityId, 10)).pop();
  }

  updateLocation(e) {
    const location = e.currentTarget.value.trim();

    this.setState({
      inputCity: location,
    });

    fetchCityId(location)
    .then((cityModels) => {
      this.setState({
        cityModels,
        inputCountryCode: cityModels.length === 1 ? cityModels[0].countryCode : '',
        selectedCityId: cityModels.length === 1 ? cityModels[0].id : null,
      });
    })
    .catch((err) => {
      console.error('Could not fetch cityId: ', err);
    });
  }

  buildInputAndAddCity() {
    const countryCodePart = capitalize(this.state.inputCountryCode ? `, ${this.state.inputCountryCode}` : '');
    const location = capitalize(this.state.inputCity);

    return (
      <div className="city-input__input-and-add">
        <label htmlFor="input-city-name">Location:
          <input id="input-city-name" autoFocus type="text" value={location} onChange={this.updateLocation} placeholder="Enter a city name..." />
          <span>{ countryCodePart }</span>
        </label>
        <button onClick={this.onAddCity}>+</button>
      </div>
    );
  }

  buildSuggestions() {
    if (this.state.cityModels.length <= 1 || this.state.selectedCityId) {
      return null;
    }

    return (
      <div className="city-input__suggestions">
        {
          this.state.cityModels.map((c) => {
            const key = `${c.id}-${c.name}-${c.countryCode}`;
            const text = capitalize(`${c.name}, ${c.countryCode}`);
            return <button key={key} value={c.id} onClick={this.onChooseCity}>{text}</button>;
          })
        }
      </div>
    );
  }

  render() {
    return (
      <div className="city-input">
        <div className="pacifico">How&#39;s the weather in...</div>
        <div className="city-input__enter-box">
          { this.buildInputAndAddCity() }
          { this.buildSuggestions() }
        </div>
      </div>
    );
  }
}

CityInput.propTypes = {
  dispatch: React.PropTypes.func.isRequired,
};

export default connect()(CityInput);
