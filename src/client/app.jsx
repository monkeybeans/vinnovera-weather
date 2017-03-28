import React from 'react';
import { Provider } from 'react-redux';
import { Grid, Col, Row } from 'react-bootstrap';
import { store } from './data-flow';
import { CityInput } from './components/city-input';
import { AppLogo } from './components/app-logo';
import { Weathers } from './components/weathers';

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Grid>
          <Col xs={12} xsHidden smHidden>
            <Row >
              <AppLogo />
            </Row>
          </Col>
          <Col xs={1} md={4} mdOffset={4}>
            <Row>
              <CityInput />
            </Row>
          </Col>
          <Col>
            <Row>
              <Weathers />
            </Row>
          </Col>
          <Col xs={12} lgHidden mdHidden>
            <Row >
              <AppLogo />
            </Row>
          </Col>
        </Grid>
      </Provider>
    );
  }
}

export default App;
