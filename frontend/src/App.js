import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ethers } from 'ethers';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Campaigns from './components/Campaigns';
import CreateCampaign from './components/CreateCampaign';
import CampaignDetails from './components/CampaignDetails';
import './App.css';

// Import the contract ABI
import CharityPlatform from './contracts/CharityPlatform.json';

// Hardhat network configuration
const HARDHAT_NETWORK = {
  chainId: '0x539', // 1337 in hex
  chainName: 'Hardhat Localhost',
  nativeCurrency: {
    name: 'Ethereum',
    symbol: 'ETH',
    decimals: 18
  },
  rpcUrls: ['http://127.0.0.1:8545'],
  blockExplorerUrls: ['https://hardhat.org']
};

function App() {
  const [account, setAccount] = useState('');
  const [contract, setContract] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [networkError, setNetworkError] = useState('');

  const removeExistingNetwork = async () => {
    try {
      // Try to remove the existing network
      await window.ethereum.request({
        method: 'wallet_removeEthereumChain',
        params: [{ chainId: '0x539' }], // Updated to 1337
      });
      // Wait a moment for the removal to complete
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (error) {
      console.log('Error removing network:', error);
      // Ignore errors as the network might not exist
    }
  };

  const switchToHardhatNetwork = async () => {
    try {
      // First try to switch to the network
      try {
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: HARDHAT_NETWORK.chainId }],
        });
      } catch (switchError) {
        // If the network doesn't exist, try to remove any existing network first
        if (switchError.code === 4902) {
          await removeExistingNetwork();
          
          // Then try to add the network
          try {
            await window.ethereum.request({
              method: 'wallet_addEthereumChain',
              params: [HARDHAT_NETWORK],
            });
          } catch (addError) {
            console.error('Error adding Hardhat network:', addError);
            setNetworkError(
              'Failed to add Hardhat network. Please follow these steps manually:\n' +
              '1. Open MetaMask\n' +
              '2. Click the network dropdown\n' +
              '3. Click "Add Network"\n' +
              '4. Enter these details:\n' +
              '   - Network Name: Hardhat Localhost\n' +
              '   - RPC URL: http://127.0.0.1:8545\n' +
              '   - Chain ID: 1337\n' +
              '   - Currency Symbol: ETH'
            );
          }
        } else {
          console.error('Error switching to Hardhat network:', switchError);
          setNetworkError(
            'Failed to switch to Hardhat network. Please switch manually in MetaMask to the Hardhat Localhost network.'
          );
        }
      }
    } catch (error) {
      console.error('Error in network switching:', error);
      setNetworkError('An error occurred while configuring the network. Please try again.');
    }
  };

  useEffect(() => {
    const init = async () => {
      try {
        // Check if MetaMask is installed
        if (window.ethereum) {
          // Get the provider
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          
          // Get the network
          const network = await provider.getNetwork();
          
          // Check if we're on the correct network (Hardhat local network)
          if (network.chainId !== 1337) { // Updated to 1337
            setNetworkError('Please connect to the Hardhat local network');
            await switchToHardhatNetwork();
          } else {
            setNetworkError('');
          }

          // Get the contract address from your deployment
          const contractAddress = "YOUR_CONTRACT_ADDRESS"; // Replace with your deployed contract address
          
          // Create contract instance
          const contractInstance = new ethers.Contract(
            contractAddress,
            CharityPlatform.abi,
            provider
          );

          setContract(contractInstance);

          // Listen for account changes
          window.ethereum.on('accountsChanged', (accounts) => {
            setAccount(accounts[0] || '');
          });

          // Listen for chain changes
          window.ethereum.on('chainChanged', (chainId) => {
            if (parseInt(chainId, 16) !== 1337) { // Updated to 1337
              setNetworkError('Please connect to the Hardhat local network');
            } else {
              setNetworkError('');
            }
            window.location.reload();
          });
        } else {
          setError('Please install MetaMask to use this application');
        }
      } catch (error) {
        console.error('Error initializing app:', error);
        setError('Failed to initialize application');
      } finally {
        setLoading(false);
      }
    };

    init();
  }, []);

  const handleConnect = (address) => {
    setAccount(address);
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading application...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <h2>Error</h2>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="app">
      <Navbar account={account} onConnect={handleConnect} />
      {networkError && (
        <div className="network-error">
          <p>{networkError}</p>
          <button onClick={switchToHardhatNetwork} className="button-primary">
            Switch to Hardhat Network
          </button>
        </div>
      )}
      <Routes>
        <Route path="/" element={<Home contract={contract} account={account} />} />
        <Route path="/campaigns" element={<Campaigns contract={contract} account={account} />} />
        <Route path="/create" element={<CreateCampaign contract={contract} account={account} />} />
        <Route path="/campaign/:id" element={<CampaignDetails contract={contract} account={account} />} />
      </Routes>
    </div>
  );
}

export default App; 