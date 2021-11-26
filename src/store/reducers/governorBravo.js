import { PROPOSAL_CREATED } from "../actions/types"

const initialState = {
    proposals: [],
    currentProposal: null
}

export function governorBravoReducer(state = initialState, action) {
    switch (action.type) {
        case PROPOSAL_CREATED:
            return {
                ...state,
                proposals: [...state.proposals, action.payload]
            }
        default:
            return state
    }
}