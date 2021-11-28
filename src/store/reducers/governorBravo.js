import {
    PROPOSAL_CREATED,
    DELEGATE_FAIL,
    DELEGATE_SUCCESS
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

        case DELEGATE_FAIL: {
            return {
                ...state,
                delegationStatus: 'FAIL'
            }
        }

        case DELEGATE_SUCCESS: {
            return {
                ...state,
                delegationStatus: 'SUCCESS'
            }
        }

        default:
            return state
    }
}