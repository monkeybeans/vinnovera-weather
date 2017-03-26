import React from 'react';
import { CityInput } from './components/city-input';
import { AppLogo } from './components/app-logo';
import { Weathers } from './components/weathers';

class App extends React.Component {
  render() {
    return (
      <div>
        <CityInput />
        <Weathers />
        <AppLogo />
      </div>
    );
  }
}

export default App;
