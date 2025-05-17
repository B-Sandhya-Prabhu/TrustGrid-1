import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ethers } from 'ethers';

const WalletConnect = ({ onConnect }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const connectWallet = async () => {
    setLoading(true);
    setError('');

    try {
      if (!window.ethereum) {
        throw new Error('Please install MetaMask to use this application');
      }

      // Request account access
      const accounts = await window.ethereum.request({ 
        method: 'eth_requestAccounts' 
      });

      // Get the provider and network
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const network = await provider.getNetwork();

      // Check if we're on the correct network (Hardhat local network)
      if (network.chainId !== 1337) {
        try {
          // Try to switch to Hardhat network
          await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: '0x539' }], // 1337 in hex
          });
        } catch (switchError) {
          // If the network is not added to MetaMask, add it
          if (switchError.code === 4902) {
            await window.ethereum.request({
              method: 'wallet_addEthereumChain',
              params: [{
                chainId: '0x539',
                chainName: 'Hardhat Local',
                nativeCurrency: {
                  name: 'ETH',
                  symbol: 'ETH',
                  decimals: 18
                },
                rpcUrls: ['http://127.0.0.1:8545'],
              }],
            });
          } else {
            throw switchError;
          }
        }
      }

      // Get the signer
      const signer = provider.getSigner();
      const address = await signer.getAddress();

      // Call the onConnect callback with the address
      onConnect(address);
    } catch (error) {
      console.error('Error connecting wallet:', error);
      setError(error.message || 'Failed to connect wallet');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className="wallet-connect"
    >
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="error"
        >
          {error}
        </motion.div>
      )}
      
      <motion.button
        className="button-primary"
        onClick={connectWallet}
        disabled={loading}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {loading ? (
          <>
            <div className="loading-spinner"></div>
            Connecting...
          </>
        ) : (
          <>
            <i className="fas fa-wallet"></i>
            Connect Wallet
          </>
        )}
      </motion.button>
    </motion.div>
  );
};

export default WalletConnect; 