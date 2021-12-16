import {
    SET_KEY,
    WEB2_LOGIN,
    WEB2_LOGOUT,
    USER_ERROR
} from './types'

import { initialState } from '../reducers/user'
import axios from 'axios'

export const web2Login = (user) => ({
    type: WEB2_LOGIN,
    payload: user
})

export const web2Logout = () => ({
    type: WEB2_LOGOUT,
    payload: initialState
})

export const setKey = (key) => ({
    type: SET_KEY,
    payload: key
})

export const setError = (message) => ({
    type: USER_ERROR,
    payload: message
})

export const fetchKeyFromGithub = (nickname) => {
    return async dispatch => {
        try {
            const res = await axios.get(`https://api.github.com/users/${nickname}/keys`)
            dispatch(setKey(res.data.length > 0 ? res.data[0].key : ''))
        } catch (error) {
            dispatch(setError(error.message))
        }
    }
}