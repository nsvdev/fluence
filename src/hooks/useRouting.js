import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useLocation, useNavigate } from "react-router-dom"
import { useAuth0 } from "@auth0/auth0-react"

import {
    ROUTE_CLAIMED,
    ROUTE_CONNECT,
    ROUTE_DELEGATION,
    ROUTE_INDEX,
    ROUTE_PROOF,
    ROUTE_WALLET,
    locationPriority
} from "../constants/routes"
import { setRoute } from '../store/actions/routes'

export const useRouting = () => {
    const location = useLocation()

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location]);

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { isAuthenticated } = useAuth0()
    const { findAccountData } = useSelector(state => state.governance)
    const { key } = useSelector(state => state.user)

    const calculatePriority = (rt) => (locationPriority?.[rt] || 0)

    // if the graph data is fetched and the user 
    // is in the contract, navigate to claimed

    useEffect(() => {
        if (calculatePriority(location.pathname) < calculatePriority(ROUTE_PROOF)) {
            if (!!findAccountData) {
                // for demo invert this
                if (findAccountData?.account) {
                    dispatch(setRoute(ROUTE_CLAIMED))
                } else {
                    dispatch(setRoute(ROUTE_PROOF))
                }
            }
        }
    }, [findAccountData])


    useEffect(() => {
        if (calculatePriority(location.pathname) < calculatePriority(ROUTE_WALLET)) {
            if (isAuthenticated && key) {
                dispatch(setRoute(ROUTE_WALLET))
            }
        }
    }, [isAuthenticated, key])

    return [ location, navigate ]
}