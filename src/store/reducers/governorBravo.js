import {
    PROPOSAL_CREATED,
    DELEGATE_STATUS,
    SET_DELEGATEE
} from "../actions/types"

const initialState = {
    proposals: [],
    degelationStatus: null,
    currentProposal: null,
    delegatee: null
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

        case SET_DELEGATEE: {
            return {
                ...state,
                delegatee: action.payload
            }
        }

        default:
            return state
    }
}