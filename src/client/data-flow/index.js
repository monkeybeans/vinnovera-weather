import { createStore } from 'redux';

const actionsEnum = {
  CITY_ADD: 0,
  CITY_REMOVE: 1,
};

function addCity(dispatch, cityId) {
  dispatch({
    type: actionsEnum.CITY_ADD,
    cityId,
  });
}

function removeCity(dispatch, cityId) {
  return {
    type: actionsEnum.CITY_REMOVE,
    cityId,
  };
}

export function weatherReducer(state = [], action) {
  const stateCpy = state.slice();
  const cityIdIndx = stateCpy.indexOf(action.cityId);

  switch (action.type) {
    case actionsEnum.CITY_ADD:
      // TODO: better handling of doubbles
      if (cityIdIndx === -1) {
        stateCpy.concat(action.cityId);
      }
      return stateCpy;
    case actionsEnum.CITY_REMOVE:
      if (cityIdIndx !== -1) {
        rmIndx.splice(cityIdIndx, 1);
      }
      return stateCpy;
    default:
      return state;
  }
}

const store = createStore(
  weatherReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

export {
  store,
  addCity,
  removeCity,
};
