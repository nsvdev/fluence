import { gql } from '@apollo/client'
import { SET_FLUENCE_SUBGRAPH } from "./types"

export const setFluenceSubgraph = (subgraph) => ({
    type: SET_FLUENCE_SUBGRAPH,
    payload: subgraph
})