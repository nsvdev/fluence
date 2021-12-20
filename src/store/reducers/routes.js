import { SET_ROUTE, ROUTE_CLEANUP } from "../actions/types";

const initialState = {
    currentRoute: '/'
}

export const routesReducer = (state=initialState, action) => {
    switch (action.type) {
        case ROUTE_CLEANUP: {
            return initialState
        }

        case SET_ROUTE:
            return {
                ...state,
                currentRoute: action.payload
            }
    
        default:
            return state
    }
}