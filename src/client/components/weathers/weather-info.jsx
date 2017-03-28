import React from 'react';
import { fetchWeather } from '../../api';

class WeatherInfo extends React.Component {
  constructor(props) {
    super(props);
  }

  updateWeather() {
    const cityId = this.props.cityId;

    fetchWeather(cityId)
    .then();
  }

  render() {
    return (
      <div>
        <span>WHEATHER LOG { this.props.cityId }</span>
        <span>
          <div>Temprature</div>
          <div>City, Coutry</div>
        </span>
        <span>x</span>
      </div>
    );
  }
}

WeatherInfo.propTypes = {
  cityId: React.PropTypes.string.isRequired,
};

export default WeatherInfo;
