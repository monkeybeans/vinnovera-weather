import React from 'react';
import { Provider } from 'react-redux';
import { store } from './data-flow';
import { CityInput } from './components/city-input';
import { AppLogo } from './components/app-logo';
import { Weathers } from './components/weathers';

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <div>
          <CityInput />
          <Weathers />
          <AppLogo />
        </div>
      </Provider>
    );
  }
}

export default App;
