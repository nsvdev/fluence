import { Routes, Route} from 'react-router-dom';


import PageBegin from '../../pages/begin-page/begin-page';
import FirstStepPage from '../../pages/step1-page/step1-page';
import ProofPage from '../../pages/proof-page/proof-page';
import DelegationPage from '../../pages/delegation-page/delegation-page';
import DonePage from '../../pages/done-page/done-page';
import AccountNotFound from '../../pages/not-found-account-page/not-found-account-page';
import LandingPage from '../../pages/landing-page/landing-page';
import FinishPage from '../../pages/finish-page/finish-page';

import ConnectWallet from '../ConnectWallet/ConnectWallet';


import './App.css';

function App() {
  return (
    <div className="App">
      <Routes>
        
        <Route path='/proof' element={<ProofPage/>} />
        <Route path='/delegation' element={<DelegationPage/>} />
        <Route path='/wallet' element={<FirstStepPage/>} />
        <Route path='/done' element={<DonePage/>} />
        <Route path='/connect' element={<ConnectWallet />} />
        <Route path='/not-found' element={<AccountNotFound />} />
        <Route path='/fluence' element={<LandingPage />} />
        <Route path='/finish' element={<FinishPage />} />
        <Route path='/' element={<PageBegin/>} />

      </Routes>
    </div>
  );
}

export default App;
