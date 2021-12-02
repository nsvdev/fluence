import { combineReducers } from "redux"
import { walletReducer } from "./wallet"
import { governorBravoReducer } from "./governorBravo"

export default combineReducers({
    wallet: walletReducer,
    governorBravo: governorBravoReducer
})