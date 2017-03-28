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
    this.setState({ selectedCityId: cityId });
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

  render() {
    return (
      <div>
        <div>How&#39;s the weather in...</div>
        <span>Location: </span>
        <input type="text" value={this.state.location} onChange={this.updateLocation} />
        <select ref={(select) => { this.select = select; }}>
          {
            this.state.cityModels.map(c => <option value={c.id} key={`${c.id}-${c.name}-${c.countryCode}`}>{ `${c.name}, ${c.countryCode}` }</option>)
          }
        </select>
        <span onClick={this.onAddCity} >+</span>
      </div>
    );
  }
}

CityInput.propTypes = {
  dispatch: React.PropTypes.func.isRequired,
};

export default connect()(CityInput);
