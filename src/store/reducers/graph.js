import { SET_FLUENCE_SUBGRAPH, GRAPH_CLEANUP } from "../actions/types"

const initialState = {
    fluence: null
}

export const graphReducer = (state = initialState, action) => {
    switch (action.type) {
        case GRAPH_CLEANUP: {
            return initialState
        }

        case SET_FLUENCE_SUBGRAPH:
            return {
                ...state,
                fluence: action.payload
            }
    
        default:
            return state
    }
}