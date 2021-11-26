import { Routes, Route} from 'react-router-dom';


import PageBegin from '../../pages/begin-page/begin-page';
import FirstStepPage from '../../pages/step1-page/step1-page';
import ProofPage from '../../pages/proof-page/proof-page';
import DelegationPage from '../../pages/delegation-page/delegation-page';
import DonePage from '../../pages/done-page/done-page';
import ConnectWallet from '../ConnectWallet/ConnectWallet';
import { useWeb3Connection } from '../../hooks/useWeb3Connection';

import './App.css';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { delegateTo } from '../../store/actions/governorBravo';
import { useContract } from '../../hooks/useContract';
import { GovernorBravoDelegator } from '../../constants';

function App() {
  const { address, web3, sendTransaction } = useWeb3Connection()
  const [ contract ] = useContract(GovernorBravoDelegator, web3)

  const dispatch = useDispatch()
  useEffect(() => {
    if(address && web3 && contract) {
      dispatch(delegateTo(sendTransaction, contract, address))
    }
  }, [address])

  return (
    <div className="App">
      <Routes>
        
        <Route path='/proof' element={<ProofPage/>} />
        <Route path='/delegation' element={<DelegationPage/>} />
        <Route path='/wallet' element={<FirstStepPage/>} />
        <Route path='/done' element={<DonePage/>} />
        <Route path='/' element={<PageBegin/>} />

      </Routes>
    </div>
  );
}

export default App;
