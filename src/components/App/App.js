import { Routes, Route} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useAuth0 } from '@auth0/auth0-react';
import { useEffect } from 'react';

import PageBegin from '../../pages/begin-page/begin-page';
import FirstStepPage from '../../pages/step1-page/step1-page';
import ProofPage from '../../pages/proof-page/proof-page';
import DelegationPage from '../../pages/delegation-page/delegation-page';
import DonePage from '../../pages/done-page/done-page';
import ClaimedPage from '../../pages/claimed-page/claimed-page';
import AccountNotFound from '../../pages/not-found-account-page/not-found-account-page';
import LandingPage from '../../pages/landing-page/landing-page';
import FinishPage from '../../pages/finish-page/finish-page';
import ConnectWallet from '../ConnectWallet/ConnectWallet';

import './App.css';
import { getProposalCount } from '../../store/actions/governance';
import { web2Login } from '../../store/actions/user';
import { getNetworkName } from '../../store/actions/wallet';
import { useWeb3Connection } from '../../hooks/useWeb3Connection'; 

function App() {

  const { web3Provider } = useWeb3Connection()

  const dispatch = useDispatch()
  const error = useSelector(state => state.governance.error)
  const networkName = useSelector(state => state.wallet.networkName)
  const { user, isAuthenticated } = useAuth0()

  useEffect(() => {
    if (web3Provider) {
      dispatch(getNetworkName(web3Provider))
    }
  },[web3Provider])

  useEffect(() => {
    if (networkName) {
      dispatch(getProposalCount(web3Provider, networkName))
    }
  }, [networkName])

  useEffect(() => {
    if (error) {
      // todo: replace with a toast
      alert(error)
    }
  }, [error])


  useEffect(() => {
    if (isAuthenticated) {
      dispatch(web2Login(user))
    }
  }, [user, isAuthenticated])

  return (
      <div className="App">
        <Routes>
          <Route path='/fluence' element={<LandingPage />} />
          <Route path='/' element={<PageBegin/>} />
          <Route path='/wallet' element={<FirstStepPage/>} />
          <Route path='/connect' element={<ConnectWallet />} />
          <Route path='/proof' element={<ProofPage/>} />
          <Route path='/delegation' element={<DelegationPage/>} />
          <Route path='/done' element={<DonePage/>} />
          <Route path='/finish' element={<FinishPage />} />
          <Route path='/not-found' element={<AccountNotFound />} />
          <Route path='/claimed' element={<ClaimedPage />} />
        </Routes>
      </div>
  );
}

export default App;
