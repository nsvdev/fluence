import { combineReducers } from "redux"
import { walletReducer } from "./wallet"
import { governanceReducer } from "./governance"
import { userReducer } from "./user"
import { graphReducer } from "./graph"

export default combineReducers({
    wallet: walletReducer,
    governance: governanceReducer,
    user: userReducer,
    graph: graphReducer
})