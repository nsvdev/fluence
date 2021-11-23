import { Routes, Route} from 'react-router-dom';

import Header from '../Header/Header';
import Text from '../Text/Text'
import DefinitionList from '../DefinitionList/DefinitionList';
import Button from '../Button/Button';
import Title from '../Title/Title';
import Progress from '../Progress/Progress';
import WalletInfo from '../WalletInfo/WalletInfo';
import PageBegin from '../../pages/begin-page/begin-page';
import FirstStepPage from '../../pages/step1-page/step1-page';
import ConnectWallet from '../ConnectWallet/ConnectWallet';
import './App.css';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/begin' element={<PageBegin/>} />
        <Route path='/' element={<FirstStepPage/>} />
        <Route path='/connect' element={<ConnectWallet />} />
      </Routes>
    </div>
  );
}

export default App;
