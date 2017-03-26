import React from 'react';
import WeatherInfo from './weather-info';

class Weaters extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <WeatherInfo />
        <WeatherInfo />
      </div>
    );
  }
}

export default Weaters;
