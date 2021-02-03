/* Setting up initial state variables */
export const initialState = {
    darkMode: false,
    title: 'Title of widget',
    temperature: 'metric',
    wind: 'on'
}

/* Setting up data layer action types */
export const actionTypes = {
    SET_DARK_MODE: 'SET_DARK_MODE',
    SET_TITLE: 'SET_TITLE',
    SET_TEMPERATURE: 'SET_TEMPERATURE',
    SET_WIND: 'SET_WIND'
}

/* Setting actions */
const reducer = (state, action) => {
    // console.log(action); // Helpful for debugging

    switch (action.type) {

        case actionTypes.SET_DARK_MODE:
            return {
                ...state,
                darkMode: action.darkMode
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