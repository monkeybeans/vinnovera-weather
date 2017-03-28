import React from 'react';
import { connect } from 'react-redux';
import { fetchWeather } from '../../api';
import { WeatherModel } from '../../../models';
import { removeCity } from '../../data-flow';

const calculateTempFeeling = (temp) => {
  const temprature = Number.parseInt(temp, 10);

  if (temprature > 25) {
    return 'hot';
  } else if (temprature > 15) {
    return 'warm';
  } else if (temprature > 5) {
    return 'cold';
  } else if (temprature < -5) {
    return 'freezing';
  }

  return '';
};


class WeatherInfo extends React.Component {
  constructor(props) {
    super(props);

    this.onRemove = this.onRemove.bind(this);
    this.state = {
      weatherModel: new WeatherModel(),
    };
  }

  componentWillMount() {
    this.updateWeather();
  }

  onRemove() {
    removeCity(this.props.dispatch, this.props.cityId);
  }

  updateWeather() {
    const cityId = this.props.cityId;
    const self = this;

    fetchWeather(cityId)
    .then((weatherModel) => {
      console.log('weatherModel: ', weatherModel);
      self.setState({ weatherModel });
    })
    .catch((err) => { console.error(`COULD NOT FETCH WEATHER FOR ${cityId}: ${err}`); });
  }

  render() {
    const { weatherModel } = this.state;
    const tempFeel = calculateTempFeeling(weatherModel.temprature);
    let content = <div>Waiting for data, could take up to 10 minutes...</div>;
    if (weatherModel.valid()) {
      content = (
        <div className="weather-info__content">
          <span className="weather-info__icon">{ weatherModel.icon }</span>
          <span className="weather-info__temperature">
            <div>{ weatherModel.temprature } &#176;C</div>
            <div>{ `${weatherModel.cityName}, ${weatherModel.countryName}`}</div>
          </span>
        </div>
      );
    }

    return (
      <div className={`weather-info ${tempFeel}`}>
        { content }
        <span onClick={this.onRemove} className="weather-info__remove">x</span>
      </div>
    );
  }
}

WeatherInfo.propTypes = {
  cityId: React.PropTypes.string.isRequired,
  dispatch: React.PropTypes.func.isRequired,
};

export default connect()(WeatherInfo);
