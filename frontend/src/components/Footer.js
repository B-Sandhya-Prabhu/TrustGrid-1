import React from 'react';
import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <motion.footer
      className="footer"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
    >
      <div className="footer-content">
        <motion.div
          className="footer-left"
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <div className="footer-brand">
            <i className="fas fa-hands-helping"></i>
            <span>CharityChain</span>
          </div>
          <p className="footer-tagline">Transparent, secure, and impactful charitable giving</p>
        </motion.div>

        <motion.div
          className="footer-right"
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <div className="footer-links">
            <motion.a
              href="https://github.com/yourusername/charitychain"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <i className="fab fa-github"></i>
              <span>GitHub</span>
            </motion.a>
            <motion.a
              href="#"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <i className="fas fa-book"></i>
              <span>Documentation</span>
            </motion.a>
            <motion.a
              href="#"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <i className="fas fa-question-circle"></i>
              <span>Help</span>
            </motion.a>
          </div>
          <p className="footer-copyright">
            &copy; {new Date().getFullYear()} CharityChain. All rights reserved.
          </p>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer; 