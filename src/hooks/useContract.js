import { governanceContracts } from '../constants/addresses'

export const useContract = (contract, web3) => {
    const con = new web3.eth.Contract(
                    contract.abi,
                    governanceContracts.kovan.bravo
                )

    return [ con ]
}