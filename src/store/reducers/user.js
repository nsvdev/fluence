import { WEB2_LOGIN, WEB2_LOGOUT } from "../actions/types"

export const initialState = {
    name: null,
    nickname: null,
    picture: null,
    sub: null,
    email: null,
    email_verfified: null,
    updated_at: null,
    key: 'test'
}

export const userReducer = (state=initialState, action) => {
    switch (action.type) {
        case WEB2_LOGIN:
            return {
                ...state,
                ...action.payload
            }

        case WEB2_LOGOUT:
            return {
                ...state,
                ...action.payload
            }
    
        default:
            return state
    }
}