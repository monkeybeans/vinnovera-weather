import React from 'react';
import { fetchCityId } from '../../api';

class CityInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      location: '',
      selectedCityId: null,
      cities: [],
    };
    this.updateLocation = this.updateLocation.bind(this);
    this.onSelectCity = this.onSelectCity.bind(this);
    this.onAddCity = this.onAddCity.bind(this);
  }

  onAddCity() {
    console.log('ADD CITY: ', this.state.selectedCityId);
  }

  onSelectCity(e) {
    const el = e.currentTarget;
    const cityId = el.options[el.selectedIndex].value;
    this.setState({ selectedCityId: cityId });
  }

  updateLocation(e) {
    const location = e.currentTarget.value;

    this.setState({ location });
    fetchCityId(location)
    .then((cityModels) => {
      this.setState({
        cities: cityModels,
      });
    })
    .catch((err) => {
      console.error('Could not fetch cityId: ', err);
    });
  }

  render() {
    return (
      <div>
        <div>How's the weather in...</div>
        <span>Location: </span>
        <input type="text" onChange={this.updateLocation} />
        <select onChange={this.onSelectCity}>
          {
            this.state.cities.map(c => <option value={c.id} key={`${c.id}-${c.name}-${c.countryCode}`}>{ `${c.name}, ${c.countryCode}` }</option>)
          }
        </select>
        <span onClick={this.onAddCity} >+</span>
      </div>
    );
  }
}

export default CityInput;
