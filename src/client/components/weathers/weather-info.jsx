import React from 'react';

class WeatherInfo extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <span>WHEATHER LOG { this.props.cityId }</span>
        <span>
          <div>Temprature</div>
          <div>City, Coutry</div>
        </span>
        <span>close button</span>
      </div>
    );
  }
}

WeatherInfo.propTypes = {
  cityId: React.PropTypes.string.isRequired,
};

export default WeatherInfo;
