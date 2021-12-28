import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import './index.css';
import App from './components/App/App';
import reportWebVitals from './reportWebVitals';
import rootReducer from './store/reducers/root';
import { applyMiddleware, createStore, compose } from 'redux';
import thunk from 'redux-thunk';
import Auth0ProviderRouted from './components/Auth0ProviderRouted/Auth0ProviderRouted';


const composeEnhancers = 
  (process.env.NODE_ENV === 'development' 
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ :
     null) 
  || compose;

const enhancer = composeEnhancers(
  applyMiddleware(thunk)
)


const store = createStore(rootReducer, applyMiddleware(thunk))

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
        <Router>
          <Auth0ProviderRouted>
            <App />
          </Auth0ProviderRouted>
        </Router>
    </Provider>
    
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
