export const actionsEnum = {
  CITY_ADD: 0,
  CITY_REMOVE: 1,
};

export function addCity(cityId) {
  return {
    type: actionsEnum.ADD_CITY,
    weather,
  };
}

export function removeCity(cityId) {
  return {
    type: actionsEnum.ADD_CITY,
    weather,
  };
}


export function weathers(state = {}, action) {
  const stateCpy = state.slice();
  switch (action.type) {
    case actionsEnum.CITY_ADD:
      return stateCpy.concat(action.weather);
    case actionsEnum.CITY_REMOVE:
        if (stateCpy.indexOf(action.cityId))
        return stateCpy.concat(action.weather);
    default:
      return state;
  }
}

export function weathers(state = {}, action)
