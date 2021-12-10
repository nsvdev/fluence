import {
    WEB2_LOGIN, WEB2_LOGOUT
} from './types'

import { initialState } from '../reducers/user'

export const web2Login = (user) => ({
    type: WEB2_LOGIN,
    payload: user
})

export const web2Logout = () => ({
    type: WEB2_LOGOUT,
    payload: initialState
})