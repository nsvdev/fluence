import {
    PROPOSAL_CREATED,
    DELEGATE_STATUS,
    SET_DELEGATEE,
    SET_ERROR,
    SET_PROPOSAL_COUNT
} from "../actions/types"

const initialState = {
    proposals: [],
    degelationStatus: null,
    currentProposal: null,
    delegatee: null,
    error: null,
    proposalCount: null
}

export function governanceReducer(state = initialState, action) {
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
        case SET_ERROR: {
            return {
                ...state,
                error: action.payload
            }
        }
        case SET_PROPOSAL_COUNT: {
            return {
                ...state,
                proposalCount: action.payload 
            }
        }
        default:
            return state
    }
}