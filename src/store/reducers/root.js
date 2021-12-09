import { combineReducers } from "redux"
import { walletReducer } from "./wallet"
import { governanceReducer } from "./governance"
import { userReducer } from "./user"

export default combineReducers({
    wallet: walletReducer,
    governance: governanceReducer,
    user: userReducer
})