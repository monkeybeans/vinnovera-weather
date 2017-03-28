import React from 'react';
import { connect } from 'react-redux';
import { fetchCityId } from '../../api';
import { addCity } from '../../data-flow';

class CityInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      location: '',
      selectedCityId: null,
      cityModels: [],
    };
    this.updateLocation = this.updateLocation.bind(this);
    this.onSelectCity = this.onSelectCity.bind(this);
    this.onAddCity = this.onAddCity.bind(this);
  }

  onAddCity() {
    // TODO: check when selectedCityId is null
    const cityId = this.select ? this.select.value : -1;
    const choosenCityModel = this.state.cityModels.filter(m => m.id == cityId).pop();

    if (!choosenCityModel || !choosenCityModel.valid()) { return; }

    addCity(this.props.dispatch, this.select.value);
    this.setState({
      location: '',
      selectedCityId: null,
      cityModels: [],
    });
  }

  onSelectCity(e) {
    const el = e.currentTarget;
    const cityId = el.options[el.selectedIndex].value;
    console.info('Select id: ', cityId);
    this.setState({
      selectedCityId: cityId,
    });
  }

  updateLocation(e) {
    const location = e.currentTarget.value;

    this.setState({ location });
    fetchCityId(location)
    .then((cityModels) => {
      this.setState({
        cityModels,
      });
    })
    .catch((err) => {
      console.error('Could not fetch cityId: ', err);
    });
  }

  renderSuggestions() {
    if (this.state.cityModels.length === 0) {
      return null;
    }

    return (
      <div className="city-input__suggestions">
        <select ref={(select) => { this.select = select; }}>
          {
            this.state.cityModels.map(c => <option value={c.id} key={`${c.id}-${c.name}-${c.countryCode}`}>{ `${c.name}, ${c.countryCode}` }</option>)
          }
        </select>
      </div>
    );
  }

  render() {
    return (
      <div className="city-input">
        <div className="pacifico">How&#39;s the weather in...</div>
        <div className="city-input__search">
          <label htmlFor="input-city-name">Location:
            <input id="input-city-name" type="text" value={this.state.location} onChange={this.updateLocation} placeholder="Enter a city name..." />
          </label>
          <button onClick={this.onAddCity}>+</button>
        </div>
        { this.renderSuggestions() }
      </div>
    );
  }
}

CityInput.propTypes = {
  dispatch: React.PropTypes.func.isRequired,
};

export default connect()(CityInput);
