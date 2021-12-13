import { combineReducers } from "redux"
import { walletReducer } from "./wallet"
import { governanceReducer } from "./governance"

export default combineReducers({
    wallet: walletReducer,
    governance: governanceReducer
})