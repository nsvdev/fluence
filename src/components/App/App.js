import { Routes, Route} from 'react-router-dom';


import PageBegin from '../../pages/begin-page/begin-page';
import FirstStepPage from '../../pages/step1-page/step1-page';
import ProofPage from '../../pages/proof-page/proof-page';
import ConnectWallet from '../ConnectWallet/ConnectWallet';
import DelegationPage from '../../pages/delegation-page/delegation-page'

import './App.css';

function App() {
  return (
    <div className="App">
      <Routes>
        
        <Route path='/proof' element={<ProofPage/>} />
        <Route path='/delegation' element={<DelegationPage/>} />
        <Route path='/wallet' element={<FirstStepPage/>} />
        <Route path='/connect' element={<ConnectWallet />} />
        <Route path='/' element={<PageBegin/>} />

      </Routes>
    </div>
  );
}

export default App;
