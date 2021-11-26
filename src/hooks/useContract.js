import GovernorBravoDelegate from '../contracts/GovernorBravoDelegate.json';
import GovernorBravoDelegator from '../contracts/GovernorBravoDelegator.json';
import { governanceContracts } from '../constants/addresses';
import supportedChains from '../constants/chains';
import Web3 from 'web3';
import { GovernorBravoDelegate as governorBravoDelegateType, GovernorBravoDelegator as governorBravoDelegatorType } from '../constants/contractTypes';


const web3 = new Web3(supportedChains[1].rpc_url)
const governorBravoDelegate = new web3.eth.Contract(
    GovernorBravoDelegate.abi,
    governanceContracts.kovan.bravo
)

const governorBravoDelegator = new web3.eth.Contract(
    GovernorBravoDelegator.abi,
    governanceContracts.kovan.bravo
)

export const useContract = (contract) => {
    switch (contract) {
        case governorBravoDelegateType:
            return [governorBravoDelegate]

        case governorBravoDelegatorType:
            return [governorBravoDelegator]

        default:
            throw new Error('Contract type not supported');
    }
}