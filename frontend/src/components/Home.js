import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Home = () => {
  return (
    <div className="home">
      <section className="hero">
        <div className="hero-background">
          <div className="hero-particles"></div>
          <div className="hero-gradient"></div>
        </div>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="hero-content"
          >
            <motion.div
              className="hero-logo-container"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            >
              <div className="hero-icon-wrapper">
                <i className="fas fa-hands-helping hero-icon"></i>
                <div className="icon-glow"></div>
              </div>
              <h1 className="hero-title">CharityChain</h1>
            </motion.div>
            <motion.h2 
              className="hero-subtitle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Transparent, secure, and impactful charitable giving powered by blockchain technology
            </motion.h2>
            <motion.div 
              className="hero-buttons"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <Link to="/campaigns">
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 8px 20px rgba(74, 144, 226, 0.3)" }}
                  whileTap={{ scale: 0.95 }}
                  className="button-primary"
                >
                  <i className="fas fa-hands-helping"></i> View Campaigns
                </motion.button>
              </Link>
              <Link to="/create">
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 8px 20px rgba(255, 255, 255, 0.2)" }}
                  whileTap={{ scale: 0.95 }}
                  className="button-secondary"
                >
                  <i className="fas fa-plus-circle"></i> Create Campaign
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>
          <motion.div
            className="hero-illustration"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <div className="floating-elements">
              <div className="floating-element element-1">
                <i className="fas fa-coins"></i>
              </div>
              <div className="floating-element element-2">
                <i className="fas fa-heart"></i>
              </div>
              <div className="floating-element element-3">
                <i className="fas fa-shield-alt"></i>
              </div>
            </div>
            <div className="hero-illustration-main">
              <i className="fas fa-donate illustration-icon"></i>
              <div className="illustration-circle"></div>
              <div className="illustration-glow"></div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="features">
        <div className="container">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Why Choose CharityChain?
          </motion.h2>
          <div className="features-grid">
            <motion.div
              className="feature-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              whileHover={{ y: -10, boxShadow: "0 12px 30px rgba(74, 144, 226, 0.15)" }}
            >
              <div className="feature-icon">
                <i className="fas fa-shield-alt"></i>
                <div className="icon-glow"></div>
              </div>
              <h3>Transparency</h3>
              <p>Every transaction is recorded on the blockchain, ensuring complete transparency in fund allocation.</p>
            </motion.div>
            <motion.div
              className="feature-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              whileHover={{ y: -10, boxShadow: "0 12px 30px rgba(74, 144, 226, 0.15)" }}
            >
              <div className="feature-icon">
                <i className="fas fa-lock"></i>
                <div className="icon-glow"></div>
              </div>
              <h3>Security</h3>
              <p>Smart contracts ensure that funds are only released when campaign goals are met.</p>
            </motion.div>
            <motion.div
              className="feature-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              whileHover={{ y: -10, boxShadow: "0 12px 30px rgba(74, 144, 226, 0.15)" }}
            >
              <div className="feature-icon">
                <i className="fas fa-chart-line"></i>
                <div className="icon-glow"></div>
              </div>
              <h3>Impact</h3>
              <p>Track the real impact of your donations with verifiable results on the blockchain.</p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="how-it-works">
        <div className="container">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            How It Works
          </motion.h2>
          <div className="steps-grid">
            <motion.div
              className="step-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              whileHover={{ y: -10, boxShadow: "0 12px 30px rgba(74, 144, 226, 0.15)" }}
            >
              <div className="step-number">1</div>
              <div className="step-icon">
                <i className="fas fa-wallet"></i>
                <div className="icon-glow"></div>
              </div>
              <h3>Connect Your Wallet</h3>
              <p>Connect your MetaMask wallet to get started with secure transactions.</p>
            </motion.div>
            <motion.div
              className="step-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              whileHover={{ y: -10, boxShadow: "0 12px 30px rgba(74, 144, 226, 0.15)" }}
            >
              <div className="step-number">2</div>
              <div className="step-icon">
                <i className="fas fa-search"></i>
                <div className="icon-glow"></div>
              </div>
              <h3>Choose a Campaign</h3>
              <p>Browse through active campaigns and select one that resonates with you.</p>
            </motion.div>
            <motion.div
              className="step-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              whileHover={{ y: -10, boxShadow: "0 12px 30px rgba(74, 144, 226, 0.15)" }}
            >
              <div className="step-number">3</div>
              <div className="step-icon">
                <i className="fas fa-hand-holding-heart"></i>
                <div className="icon-glow"></div>
              </div>
              <h3>Make a Donation</h3>
              <p>Contribute ETH to support causes you believe in, with full transparency.</p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            <motion.div
              className="stat-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              whileHover={{ y: -10, boxShadow: "0 12px 30px rgba(74, 144, 226, 0.15)" }}
            >
              <div className="stat-icon">
                <i className="fas fa-users"></i>
                <div className="icon-glow"></div>
              </div>
              <motion.h3
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                1,000+
              </motion.h3>
              <p>Active Donors</p>
            </motion.div>
            <motion.div
              className="stat-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              whileHover={{ y: -10, boxShadow: "0 12px 30px rgba(74, 144, 226, 0.15)" }}
            >
              <div className="stat-icon">
                <i className="fas fa-project-diagram"></i>
                <div className="icon-glow"></div>
              </div>
              <motion.h3
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
              >
                500+
              </motion.h3>
              <p>Campaigns</p>
            </motion.div>
            <motion.div
              className="stat-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              whileHover={{ y: -10, boxShadow: "0 12px 30px rgba(74, 144, 226, 0.15)" }}
            >
              <div className="stat-icon">
                <i className="fas fa-coins"></i>
                <div className="icon-glow"></div>
              </div>
              <motion.h3
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
              >
                1000 ETH
              </motion.h3>
              <p>Total Donations</p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home; 