import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ethers } from 'ethers';
import { Link } from 'react-router-dom';

const Campaigns = ({ contract, account }) => {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadCampaigns = async () => {
      if (!contract) return;

      try {
        setLoading(true);
        const campaignCount = await contract.campaignCount();
        const loadedCampaigns = [];

        for (let i = 1; i <= campaignCount; i++) {
          const campaign = await contract.getCampaign(i);
          loadedCampaigns.push({
            id: campaign.id.toString(),
            title: campaign.title,
            description: campaign.description,
            beneficiary: campaign.beneficiary,
            goal: ethers.utils.formatEther(campaign.goal),
            raised: ethers.utils.formatEther(campaign.raised),
            deadline: campaign.deadline.toNumber(),
            active: campaign.active
          });
        }

        setCampaigns(loadedCampaigns);
      } catch (error) {
        console.error('Error loading campaigns:', error);
        setError('Failed to load campaigns');
      } finally {
        setLoading(false);
      }
    };

    loadCampaigns();
  }, [contract]);

  const formatDate = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatAddress = (address) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  if (loading) {
    return (
      <div className="container">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading campaigns...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="error"
        >
          {error}
        </motion.div>
      </div>
    );
  }

  return (
    <div className="container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="campaigns-grid"
      >
        {campaigns.length === 0 ? (
          <div className="no-campaigns">
            <h2>No campaigns found</h2>
            <p>Be the first to create a campaign!</p>
            <Link to="/create" className="button-primary">
              <i className="fas fa-plus-circle"></i>
              Create Campaign
            </Link>
          </div>
        ) : (
          campaigns.map((campaign) => (
            <motion.div
              key={campaign.id}
              className="campaign-card"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="campaign-header">
                <h3>{campaign.title}</h3>
                <span className={`status-badge ${campaign.active ? 'status-active' : 'status-completed'}`}>
                  {campaign.active ? 'Active' : 'Completed'}
                </span>
              </div>
              
              <p className="campaign-description">{campaign.description}</p>
              
              <div className="campaign-details">
                <div className="detail-item">
                  <i className="fas fa-user"></i>
                  <span>Beneficiary: {formatAddress(campaign.beneficiary)}</span>
                </div>
                <div className="detail-item">
                  <i className="fas fa-bullseye"></i>
                  <span>Goal: {campaign.goal} ETH</span>
                </div>
                <div className="detail-item">
                  <i className="fas fa-coins"></i>
                  <span>Raised: {campaign.raised} ETH</span>
                </div>
                <div className="detail-item">
                  <i className="fas fa-clock"></i>
                  <span>Deadline: {formatDate(campaign.deadline)}</span>
                </div>
              </div>

              <div className="progress-bar">
                <div 
                  className="progress" 
                  style={{ 
                    width: `${(parseFloat(campaign.raised) / parseFloat(campaign.goal)) * 100}%` 
                  }}
                ></div>
              </div>

              <Link to={`/campaign/${campaign.id}`} className="button-primary">
                <i className="fas fa-info-circle"></i>
                View Details
              </Link>
            </motion.div>
          ))
        )}
      </motion.div>
    </div>
  );
};

export default Campaigns; 