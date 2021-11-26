import GovernorBravoDelegate from '../contracts/GovernorBravoDelegate.json'
import GovernorBravoDelegator from '../contracts/GovernorBravoDelegator.json'
import { governanceContracts } from '../constants/addresses'

import {
    GovernorBravoDelegate as governorBravoDelegateType,
    GovernorBravoDelegator as governorBravoDelegatorType
} from '../constants/contractTypes';

export const useContract = (contract, web3) => {
    const governorBravoDelegate = new web3.eth.Contract(
        GovernorBravoDelegate.abi,
        governanceContracts.kovan.bravo
    )
    
    const governorBravoDelegator = new web3.eth.Contract(
        GovernorBravoDelegator.abi,
        governanceContracts.kovan.bravo
    )

    switch (contract) {
        case governorBravoDelegateType:
            return [governorBravoDelegate]

        case governorBravoDelegatorType:
            return [governorBravoDelegator]

        default:
            throw new Error('Contract type not supported');
    }
}