const tokenSymbol = 'FLT';
const tokenDecimals = 18;
const tokenImage = 'http://placekitten.com/200/300';

export const addTokenToMetamask = async (tokenAddress) => {
    try {
        // wasAdded is a boolean. Like any RPC method, an error may be thrown.
        const wasAdded = await window.ethereum.request({
            method: 'wallet_watchAsset',
            params: {
            type: 'ERC20',
            options: {
                address: tokenAddress, // The address that the token is at.
                symbol: tokenSymbol, // A ticker symbol or shorthand, up to 5 chars.
                decimals: tokenDecimals, // The number of decimals in the token
                image: tokenImage, // A string url of the token logo
            },
            },
        });
    
        if (wasAdded) {
            console.log('FLT added to Metamask');
        } else {
            console.log('FLT rejected!');
        }
    } catch (error) {
        console.log(error);
    }

}