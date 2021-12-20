export const ROUTE_FLUENCE = '/fluence'
export const ROUTE_INDEX = '/'
export const ROUTE_WALLET = '/wallet'
export const ROUTE_CONNECT = '/connect'
export const ROUTE_PROOF = '/proof'
export const ROUTE_DELEGATION = '/delegation'
export const ROUTE_DONE = '/done'
export const ROUTE_FINISH = '/finish'
export const ROUTE_NOT_FOUND = '/not-found'
export const ROUTE_CLAIMED = '/claimed'


export const locationPriority = {
    [ROUTE_INDEX] : 0,
    [ROUTE_WALLET]: 1,
    [ROUTE_CONNECT]: 2,
    [ROUTE_PROOF]: 3,
    [ROUTE_DELEGATION]: 4,
    [ROUTE_DONE]: 5,
    [ROUTE_FINISH]: 6,
    [ROUTE_NOT_FOUND]: 7,
    [ROUTE_CLAIMED]: 8
}