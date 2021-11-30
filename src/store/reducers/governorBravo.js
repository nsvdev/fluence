import {
    PROPOSAL_CREATED,
    DELEGATE_STATUS
} from "../actions/types"

const initialState = {
    proposals: [],
    degelationStatus: null,
    currentProposal: null
}

export function governorBravoReducer(state = initialState, action) {
    switch (action.type) {
        case PROPOSAL_CREATED:
            return {
                ...state,
                proposals: [...state.proposals, action.payload]
            }

        case DELEGATE_STATUS: {
            return {
                ...state,
                delegationStatus: action.payload
            }
        }

        default:
            return state
    }
}