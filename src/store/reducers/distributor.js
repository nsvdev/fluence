import { FETCH_MERKLE_ROOT } from "../actions/types"

const initialState = {
    merkleRoot: null
}

export const distributorReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_MERKLE_ROOT:
            return {
                ...state,
                merkleRoot: action.payload
            }
    
        default:
            return state
    }
}