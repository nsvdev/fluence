import { Auth0Provider } from '@auth0/auth0-react';
import { useNavigate } from 'react-router';

const { REACT_APP_AUTH0_DOMAIN, REACT_APP_AUTH0_CLIENT } = process.env

const Auth0ProviderRouted = ({ children }) => {
    const navigate = useNavigate()

    const onRedirectCallback = (appState) => {
        navigate(appState?.returnTo || window.location.pathname)
    }

    return(
        <Auth0Provider
            domain={REACT_APP_AUTH0_DOMAIN}
            clientId={REACT_APP_AUTH0_CLIENT}
            redirectUri={window.location.origin}
            onRedirectCallback={onRedirectCallback}
        >
            { children }
        </Auth0Provider>
    )
}

export default Auth0ProviderRouted