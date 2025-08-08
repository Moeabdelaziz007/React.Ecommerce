import React from 'react';
import { Navbar, Footer } from '../components';
import WalletConnect from '../components/WalletConnect';
import './BlockchainDemo.css';
import SectionCard from '../components/web3/SectionCard';
import StatusBadge from '../components/web3/StatusBadge';

const FeatureItem = ({ text }) => (
  <li className="mb-2"><i className="fas fa-check text-success me-2" aria-hidden="true"></i><span>{text}</span></li>
);

const BlockchainDemo = () => {
  return (
    <>
      <Navbar />

      <section className="blockchain-hero" aria-label="Blockchain wallet demo">
        <div className="container text-center py-5">
          <span className="badge hero-badge mb-3" aria-label="Web3 Demo"><i className="fas fa-bolt me-2" aria-hidden="true"></i>Web3 Demo</span>
          <h1 className="hero-title mb-3">Wallet & Network</h1>
          <p className="hero-subtitle mb-0">Connect, switch networks, and test transactions with live UI state.</p>
        </div>
        <div className="hero-glow" />
      </section>

      <main className="container my-5">
        <div className="row g-4">
          <div className="col-lg-8">
            <SectionCard title="Wallet Connection" icon="fas fa-wallet">
              <WalletConnect />
            </SectionCard>
          </div>
          <div className="col-lg-4">
            <SectionCard title="Status" icon="fas fa-signal">
              <div className="d-flex flex-column gap-2">
                <div>
                  <small className="text-muted d-block">Connection</small>
                  <StatusBadge status="info" label="Real-time" />
                </div>
                <div>
                  <small className="text-muted d-block">Networks Supported</small>
                  <div className="d-flex flex-wrap gap-2">
                    <span className="badge bg-light text-dark">Ethereum</span>
                    <span className="badge bg-light text-dark">Polygon</span>
                    <span className="badge bg-light text-dark">Goerli</span>
                    <span className="badge bg-light text-dark">Mumbai</span>
                  </div>
                </div>
              </div>
            </SectionCard>
          </div>
        </div>

        <div className="row g-4 mt-1">
          <div className="col-lg-6">
            <SectionCard title="Features Demonstrated" icon="fas fa-info-circle">
              <div className="row">
                <div className="col-md-6">
                  <h6 className="fw-bold mb-3">Wallet</h6>
                  <ul className="list-unstyled">
                    <FeatureItem text="MetaMask, WalletConnect, Coinbase" />
                    <FeatureItem text="Address display" />
                    <FeatureItem text="Connection status indicators" />
                    <FeatureItem text="Disconnect flow" />
                  </ul>
                </div>
                <div className="col-md-6">
                  <h6 className="fw-bold mb-3">Network</h6>
                  <ul className="list-unstyled">
                    <FeatureItem text="Multi-network support" />
                    <FeatureItem text="Network switching" />
                    <FeatureItem text="Chain change detection" />
                    <FeatureItem text="Unsupported network alerts" />
                  </ul>
                </div>
              </div>
            </SectionCard>
          </div>
          <div className="col-lg-6">
            <SectionCard title="Transaction Lifecycle" icon="fas fa-exchange-alt">
              <ul className="list-unstyled mb-0">
                <FeatureItem text="Send transaction via connected wallet" />
                <FeatureItem text="Pending/confirming states with loaders" />
                <FeatureItem text="Success and error toasts" />
                <FeatureItem text="Hash display when available" />
              </ul>
            </SectionCard>
          </div>
        </div>

        <div className="row g-4 mt-1">
          <div className="col-12">
            <SectionCard title="How to Test" icon="fas fa-lightbulb">
              <ol className="mb-0">
                <li>Choose a wallet (MetaMask, WalletConnect, Coinbase) and connect</li>
                <li>Switch networks between Ethereum/Polygon</li>
                <li>Send a test transaction and observe the lifecycle</li>
              </ol>
            </SectionCard>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default BlockchainDemo; 