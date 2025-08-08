import { ethers } from 'ethers';

// Supported networks
export const SUPPORTED_NETWORKS = {
  1: { name: 'Ethereum Mainnet', chainId: 1, rpcUrl: 'https://rpc.ankr.com/eth', explorer: 'https://etherscan.io', currency: 'ETH' },
  137: { name: 'Polygon Mainnet', chainId: 137, rpcUrl: 'https://polygon-rpc.com', explorer: 'https://polygonscan.com', currency: 'MATIC' },
  80001: { name: 'Mumbai Testnet', chainId: 80001, rpcUrl: 'https://rpc.ankr.com/polygon_mumbai', explorer: 'https://mumbai.polygonscan.com', currency: 'MATIC' },
  5: { name: 'Goerli Testnet', chainId: 5, rpcUrl: 'https://rpc.ankr.com/eth_goerli', explorer: 'https://goerli.etherscan.io', currency: 'ETH' }
};

const WC_PID = process.env.REACT_APP_WC_PROJECT_ID || '';
const CB_APP_NAME = process.env.REACT_APP_CB_APP_NAME || 'Ecommerce DApp';

class WalletConnection {
  constructor() {
    this.provider = null;
    this.signer = null;
    this.address = null;
    this.chainId = null;
    this.isConnected = false;
    this.listeners = new Set();
    this.connector = 'metamask'; // metamask | walletconnect | coinbase
  }

  // Generic connect delegator
  async connect(connector = 'metamask') {
    this.connector = connector;
    if (connector === 'walletconnect') return this.connectWithWalletConnect();
    if (connector === 'coinbase') return this.connectWithCoinbase();
    return this.connectWithMetaMask();
  }

  // MetaMask
  async connectWithMetaMask() {
    try {
      if (!window.ethereum) throw new Error('MetaMask is not installed.');
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      if (!accounts?.length) throw new Error('No accounts found.');
      this.provider = new ethers.providers.Web3Provider(window.ethereum, 'any');
      this.signer = this.provider.getSigner();
      this.address = accounts[0];
      this.chainId = await this.signer.getChainId();
      this.isConnected = true;
      this.setupEventListeners();
      this.notifyListeners();
      return { success: true, address: this.address, chainId: this.chainId };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // WalletConnect v2
  async connectWithWalletConnect() {
    try {
      const { default: EthereumProvider } = await import('@walletconnect/ethereum-provider');
      if (!WC_PID) throw new Error('WalletConnect projectId missing (set REACT_APP_WC_PROJECT_ID)');
      const chains = [1, 137, 80001, 5];
      const wcProvider = await EthereumProvider.init({
        projectId: WC_PID,
        showQrModal: true,
        chains,
      });
      await wcProvider.enable();
      this.provider = new ethers.providers.Web3Provider(wcProvider, 'any');
      this.signer = this.provider.getSigner();
      this.address = await this.signer.getAddress();
      this.chainId = await this.signer.getChainId();
      this.isConnected = true;

      // WC specific listeners
      wcProvider.on('accountsChanged', (accounts) => {
        this.address = accounts?.[0] || null;
        if (!this.address) this.disconnect(); else this.notifyListeners();
      });
      wcProvider.on('chainChanged', (hexId) => {
        this.chainId = parseInt(hexId, 16);
        this.notifyListeners();
      });
      wcProvider.on('disconnect', () => this.disconnect());

      this.notifyListeners();
      return { success: true, address: this.address, chainId: this.chainId };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // Coinbase Wallet
  async connectWithCoinbase() {
    try {
      const { default: CoinbaseWalletSDK } = await import('@coinbase/wallet-sdk');
      const appName = CB_APP_NAME;
      const chainId = 1;
      const rpcUrl = SUPPORTED_NETWORKS[chainId].rpcUrl;
      const cb = new CoinbaseWalletSDK({ appName });
      const cbProvider = cb.makeWeb3Provider(rpcUrl, chainId);
      await cbProvider.enable();
      this.provider = new ethers.providers.Web3Provider(cbProvider, 'any');
      this.signer = this.provider.getSigner();
      this.address = await this.signer.getAddress();
      this.chainId = await this.signer.getChainId();
      this.isConnected = true;

      cbProvider.on('accountsChanged', (accounts) => {
        this.address = accounts?.[0] || null;
        if (!this.address) this.disconnect(); else this.notifyListeners();
      });
      cbProvider.on('chainChanged', (hexId) => {
        this.chainId = parseInt(hexId, 16);
        this.notifyListeners();
      });
      cbProvider.on('disconnect', () => this.disconnect());

      this.notifyListeners();
      return { success: true, address: this.address, chainId: this.chainId };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  disconnect() {
    this.provider = null;
    this.signer = null;
    this.address = null;
    this.chainId = null;
    this.isConnected = false;
    this.notifyListeners();
  }

  getWalletState() {
    return {
      isConnected: this.isConnected,
      address: this.address,
      chainId: this.chainId,
      network: SUPPORTED_NETWORKS[this.chainId] || null,
      signer: this.signer,
      provider: this.provider,
      connector: this.connector,
    };
  }

  async switchNetwork(targetChainId) {
    try {
      if (!this.isConnected) throw new Error('Wallet not connected');
      const targetNetwork = SUPPORTED_NETWORKS[targetChainId];
      if (!targetNetwork) throw new Error('Unsupported network');

      // Try EIP-3326 on the current provider
      await this.provider.provider.request?.({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: `0x${targetChainId.toString(16)}` }]
      });
      this.chainId = targetChainId;
      this.notifyListeners();
      return { success: true, chainId: this.chainId };
    } catch (error) {
      if (error.code === 4902) {
        return this.addNetwork(targetChainId);
      }
      return { success: false, error: error.message };
    }
  }

  async addNetwork(chainId) {
    try {
      const net = SUPPORTED_NETWORKS[chainId];
      if (!net) throw new Error('Unsupported network');
      await this.provider.provider.request?.({
        method: 'wallet_addEthereumChain',
        params: [{
          chainId: `0x${chainId.toString(16)}`,
          chainName: net.name,
          nativeCurrency: { name: net.currency, symbol: net.currency, decimals: 18 },
          rpcUrls: [net.rpcUrl],
          blockExplorerUrls: [net.explorer]
        }]
      });
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async sendTransaction(transaction) {
    try {
      if (!this.signer) throw new Error('Wallet not connected');
      const tx = await this.signer.sendTransaction(transaction);
      return { success: true, hash: tx.hash, transaction: tx };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async waitForTransaction(hash, confirmations = 1) {
    try {
      const receipt = await this.provider.waitForTransaction(hash, confirmations);
      return { success: true, receipt };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  setupEventListeners() {
    if (!window.ethereum) return;
    window.ethereum.removeAllListeners?.('accountsChanged');
    window.ethereum.removeAllListeners?.('chainChanged');
    window.ethereum.removeAllListeners?.('disconnect');

    window.ethereum.on?.('accountsChanged', (accounts) => {
      if (!accounts?.length) this.disconnect();
      else { this.address = accounts[0]; this.notifyListeners(); }
    });
    window.ethereum.on?.('chainChanged', (chainId) => {
      this.chainId = parseInt(chainId, 16);
      this.notifyListeners();
    });
    window.ethereum.on?.('disconnect', () => this.disconnect());
  }

  addListener(callback) { this.listeners.add(callback); return () => this.listeners.delete(callback); }
  notifyListeners() { const state = this.getWalletState(); this.listeners.forEach(cb => cb(state)); }
  formatAddress(a) { return a ? `${a.slice(0,6)}...${a.slice(-4)}` : ''; }
  isNetworkSupported(id) { return id in SUPPORTED_NETWORKS; }
  getNetworkName(id) { return SUPPORTED_NETWORKS[id]?.name || 'Unknown Network'; }
}

const walletConnection = new WalletConnection();
export default walletConnection; 