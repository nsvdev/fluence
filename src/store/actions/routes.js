import { SET_ROUTE } from "./types"

export const setRoute = (route) => ({
    type: SET_ROUTE,
    payload: route
})