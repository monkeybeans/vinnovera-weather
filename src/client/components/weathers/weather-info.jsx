import React from 'react';
import { fetchWeather } from '../../api';
import { WeatherModel } from '../../../models';

class WeatherInfo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      weatherModel: new WeatherModel(),
    };
  }

  componentWillMount() {
    this.updateWeather();
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
    let content = <div>Waiting for data, could take up to 10 minutes...</div>;
    if (weatherModel.valid()) {
      content = (
        <div>
          <span>{ weatherModel.icon }</span>
          <span>
            <div>{ weatherModel.temprature } &#176;C</div>
            <div>{ `${weatherModel.cityName}, ${weatherModel.countryName}`}</div>
          </span>
        </div>
      );
    }

    return (
      <div className="wheather-info">
        { content }
        <span>x</span>
      </div>
    );
  }
}

WeatherInfo.propTypes = {
  cityId: React.PropTypes.string.isRequired,
};

export default WeatherInfo;
