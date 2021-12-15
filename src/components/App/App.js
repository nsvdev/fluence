import { Routes, Route, useLocation} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useAuth0 } from '@auth0/auth0-react';
import { useEffect, useMemo } from 'react';
import {
  Chains,
  TheGraphProvider,
  useCreateSubgraph
} from "thegraph-react";

import './App.css';
import 'react-toastify/dist/ReactToastify.css';

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

import { getProposalCount } from '../../store/actions/governance';
import { web2Login } from '../../store/actions/user';
import { getNetworkName } from '../../store/actions/wallet';
import { ToastContainer, toast } from 'react-toastify';
import { useWeb3Connection } from '../../hooks/useWeb3Connection';
import { theGraphEndpoints } from '../../constants/endpoints';

import {
  ROUTE_FLUENCE,
  ROUTE_INDEX,
  ROUTE_WALLET,
  ROUTE_CONNECT,
  ROUTE_PROOF,
  ROUTE_DELEGATION,
  ROUTE_DONE,
  ROUTE_FINISH,
  ROUTE_NOT_FOUND,
  ROUTE_CLAIMED
} from '../../constants/routes'
import { catchError } from '../../utils';
import { setFluenceSubgraph } from '../../store/actions/graph';
import TestSubgraph from '../TestSubgraph/TestSubgraph';

function App() {
  const { web3Provider } = useWeb3Connection()

  const dispatch = useDispatch()
  const error = useSelector(state => state.governance.error)
  const networkName = useSelector(state => state.wallet.networkName)
  const { user, isAuthenticated } = useAuth0()
  const location = useLocation()

  const fluence = useCreateSubgraph({
    [Chains.RINKEBY]: theGraphEndpoints['rinkeby'],
  });

  const subgraphs = useMemo(() => {
    dispatch(setFluenceSubgraph(fluence))
    return [fluence];
  }, [fluence]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

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
      toast(catchError(error, true))
    }
  }, [error])


  useEffect(() => {
    if (isAuthenticated) {
      dispatch(web2Login(user))
    }
  }, [user, isAuthenticated])

  return (
    <TheGraphProvider chain={Chains.RINKEBY} subgraphs={subgraphs}>
      <div className="App">
        <ToastContainer />
        <Routes>
          <Route path={'/test-subgraph'} element={<TestSubgraph />} />
          <Route path={ROUTE_FLUENCE} element={<LandingPage />} />
          <Route path={ROUTE_INDEX} element={<PageBegin/>} />
          <Route path={ROUTE_WALLET} element={<FirstStepPage/>} />
          <Route path={ROUTE_CONNECT} element={<ConnectWallet />} />
          <Route path={ROUTE_PROOF} element={<ProofPage/>} />
          <Route path={ROUTE_DELEGATION} element={<DelegationPage/>} />
          <Route path={ROUTE_DONE} element={<DonePage/>} />
          <Route path={ROUTE_FINISH} element={<FinishPage />} />
          <Route path={ROUTE_NOT_FOUND} element={<AccountNotFound />} />
          <Route path={ROUTE_CLAIMED} element={<ClaimedPage />} />
        </Routes>
      </div>
    </TheGraphProvider>
  );
}

export default App;
