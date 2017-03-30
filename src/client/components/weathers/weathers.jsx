import React from 'react';
import { connect } from 'react-redux';
import WeatherInfo from './weather-info';

class Weathers extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="weathers">
        { this.props.state.map(id => <WeatherInfo key={`weather-info-$${id}`} cityId={id} />)}
      </div>
    );
  }
}

Weathers.propTypes = {
  state: React.PropTypes.arrayOf(React.PropTypes.any).isRequired, // TODO: do proper validation
};

function mapStateToProps(state) {
  return {
    state,
  };
}

export default connect(mapStateToProps)(Weathers);
