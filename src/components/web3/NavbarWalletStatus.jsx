import React, { useEffect, useState } from 'react';
import walletConnection from '../../utils/walletConnection';

function shortAddr(a) {
  return a ? `${a.slice(0, 6)}...${a.slice(-4)}` : '';
}

function friendlyNetwork(chainId, fallbackName) {
  if (!chainId) return 'Not Connected';
  switch (chainId) {
    case 1: return 'Ethereum';
    case 5: return 'Goerli';
    case 137: return 'Polygon';
    case 80001: return 'Polygon Mumbai';
    default: return fallbackName || `Chain ${chainId}`;
  }
}

export default function NavbarWalletStatus() {
  const [state, setState] = useState(walletConnection.getWalletState());
  const [isConnecting, setIsConnecting] = useState(false);

  useEffect(() => {
    const unsub = walletConnection.addListener(s => setState(s));
    setState(walletConnection.getWalletState());
    return unsub;
  }, []);

  const handleConnect = async () => {
    setIsConnecting(true);
    await walletConnection.connect('metamask');
    setIsConnecting(false);
  };

  return (
    <div className="d-flex align-items-center gap-2">
      {!state.isConnected ? (
        <button
          type="button"
          className="btn btn-cyber btn-sm"
          onClick={handleConnect}
          disabled={isConnecting}
          title="Connect Wallet"
        >
          {isConnecting ? (
            <>
              <span className="spinner-border spinner-border-sm me-2" role="status" />
              Connecting
            </>
          ) : (
            <>
              <i className="fas fa-plug me-1" /> Connect Wallet
            </>
          )}
        </button>
      ) : (
        <div className="d-flex align-items-center gap-2">
          <span className="badge bg-success" title={state.address}>
            <span className="me-1" style={{display:'inline-block',width:6,height:6,borderRadius:6,background:'#fff'}} />
            {shortAddr(state.address)}
          </span>
          <span className="badge bg-light text-dark" title="Network">
            <i className="fas fa-link me-1" /> {friendlyNetwork(state.chainId, state.network?.name)}
          </span>
        </div>
      )}
    </div>
  );
} 