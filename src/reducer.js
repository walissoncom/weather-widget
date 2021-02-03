/* Setting up initial state variables */
export const initialState = {
    latitude: null,
    longitude: null,
    title: 'Title of widget',
    temperature: 'metric',
    wind: 'on'
}

/* Setting up data layer action types */
export const actionTypes = {
    SET_LATITUDE: 'SET_LATITUDE',
    SET_LONGITUDE: 'SET_LONGITUDE',
    SET_TITLE: 'SET_TITLE',
    SET_TEMPERATURE: 'SET_TEMPERATURE',
    SET_WIND: 'SET_WIND'
}

/* Setting actions */
const reducer = (state, action) => {
    console.log(action); // Good for debugging

    switch (action.type) {

        case actionTypes.SET_LATITUDE:
            return {
                ...state,
                latitude: action.latitude
            }

        case actionTypes.SET_LONGITUDE:
            return {
                ...state,
                longitude: action.longitude
            }

        case actionTypes.SET_TITLE:
            return {
                ...state,
                title: action.title
            }

        case actionTypes.SET_TEMPERATURE:
            return {
                ...state,
                temperature: action.temperature
            }

        case actionTypes.SET_WIND:
            return {
                ...state,
                wind: action.wind
            }

        /* If the action type does not match to any of the action type list, it returns the state the way it is. This avoids error. */
        default:
            return state;
    }
}

export default reducer;