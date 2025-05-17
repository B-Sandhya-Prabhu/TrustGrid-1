import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import WalletConnect from './WalletConnect';

const Navbar = ({ account, onConnect }) => {
  const formatAddress = (address) => {
    if (!address) return '';
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <motion.nav
      className="navbar"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100 }}
    >
      <div className="navbar-content">
        <motion.div
          className="brand"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Link to="/" className="brand-link">
            <div className="brand-icon">
              <i className="fas fa-hands-helping"></i>
              <div className="icon-glow"></div>
            </div>
            <span className="brand-name">CharityChain</span>
          </Link>
        </motion.div>

        <motion.div
          className="nav-links"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <Link to="/campaigns">
            <motion.span
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <i className="fas fa-project-diagram"></i> Campaigns
            </motion.span>
          </Link>
          <Link to="/create">
            <motion.span
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <i className="fas fa-plus-circle"></i> Create
            </motion.span>
          </Link>
          <div className="wallet-section">
            {account ? (
              <motion.div
                className="wallet-info"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <i className="fas fa-wallet"></i>
                <span>{formatAddress(account)}</span>
              </motion.div>
            ) : (
              <WalletConnect onConnect={onConnect} />
            )}
          </div>
        </motion.div>
      </div>
    </motion.nav>
  );
};

export default Navbar; 