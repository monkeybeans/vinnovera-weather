import React from 'react';

class WeatherInfo extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <span>WHEATHER LOG</span>
        <span>
          <div>Temprature</div>
          <div>City, Coutry</div>
        </span>
        <span>close button</span>
      </div>
    );
  }
}

export default WeatherInfo;
