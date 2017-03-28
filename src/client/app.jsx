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
          <Row>
            <Col xs={12} xsHidden smHidden>
              <AppLogo />
            </Col>
          </Row>
          <Row>
            <Col xs={12} sm={12} md={12} lg={8} lgPush={2}>
              <CityInput />
            </Col>
          </Row>
          <Row>
            <Col>
              <Weathers />
            </Col>
          </Row>
          <Row>
            <Col sm={12} lgHidden mdHidden>
              <AppLogo />
            </Col>
          </Row>
        </Grid>
      </Provider>
    );
  }
}

export default App;
