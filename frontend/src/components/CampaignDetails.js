import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ethers } from 'ethers';

const CampaignDetails = ({ contract, account }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [campaign, setCampaign] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [donationAmount, setDonationAmount] = useState('');
  const [donating, setDonating] = useState(false);
  const [donationError, setDonationError] = useState('');
  const [donationSuccess, setDonationSuccess] = useState('');

  useEffect(() => {
    const loadCampaign = async () => {
      if (!contract) return;

      try {
        setLoading(true);
        const campaignData = await contract.getCampaign(id);
        setCampaign({
          id: campaignData.id.toString(),
          title: campaignData.title,
          description: campaignData.description,
          beneficiary: campaignData.beneficiary,
          goal: ethers.utils.formatEther(campaignData.goal),
          raised: ethers.utils.formatEther(campaignData.raised),
          deadline: campaignData.deadline.toNumber(),
          active: campaignData.active
        });
      } catch (error) {
        console.error('Error loading campaign:', error);
        setError('Failed to load campaign details');
      } finally {
        setLoading(false);
      }
    };

    loadCampaign();
  }, [contract, id]);

  const handleDonate = async (e) => {
    e.preventDefault();
    if (!account) {
      setDonationError('Please connect your wallet to donate');
      return;
    }

    if (!donationAmount || isNaN(donationAmount) || parseFloat(donationAmount) <= 0) {
      setDonationError('Please enter a valid donation amount');
      return;
    }

    try {
      setDonating(true);
      setDonationError('');
      setDonationSuccess('');

      const tx = await contract.donate(id, {
        value: ethers.utils.parseEther(donationAmount)
      });

      setDonationSuccess('Processing donation...');
      await tx.wait();
      setDonationSuccess('Donation successful!');
      
      // Refresh campaign data
      const campaignData = await contract.getCampaign(id);
      setCampaign({
        ...campaign,
        raised: ethers.utils.formatEther(campaignData.raised)
      });

      setDonationAmount('');
    } catch (error) {
      console.error('Error making donation:', error);
      setDonationError(error.message || 'Failed to make donation');
    } finally {
      setDonating(false);
    }
  };

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
          <p>Loading campaign details...</p>
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

  if (!campaign) {
    return (
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="error"
        >
          Campaign not found
        </motion.div>
      </div>
    );
  }

  return (
    <div className="container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="campaign-details"
      >
        <div className="campaign-header">
          <h2>{campaign.title}</h2>
          <span className={`status-badge ${campaign.active ? 'status-active' : 'status-completed'}`}>
            {campaign.active ? 'Active' : 'Completed'}
          </span>
        </div>

        <div className="campaign-content">
          <div className="campaign-info">
            <p className="description">{campaign.description}</p>
            
            <div className="details-grid">
              <div className="detail-item">
                <i className="fas fa-user"></i>
                <div>
                  <h4>Beneficiary</h4>
                  <p>{formatAddress(campaign.beneficiary)}</p>
                </div>
              </div>
              
              <div className="detail-item">
                <i className="fas fa-bullseye"></i>
                <div>
                  <h4>Goal</h4>
                  <p>{campaign.goal} ETH</p>
                </div>
              </div>
              
              <div className="detail-item">
                <i className="fas fa-coins"></i>
                <div>
                  <h4>Raised</h4>
                  <p>{campaign.raised} ETH</p>
                </div>
              </div>
              
              <div className="detail-item">
                <i className="fas fa-clock"></i>
                <div>
                  <h4>Deadline</h4>
                  <p>{formatDate(campaign.deadline)}</p>
                </div>
              </div>
            </div>

            <div className="progress-container">
              <div className="progress-bar">
                <div 
                  className="progress" 
                  style={{ 
                    width: `${(parseFloat(campaign.raised) / parseFloat(campaign.goal)) * 100}%` 
                  }}
                ></div>
              </div>
              <p className="progress-text">
                {((parseFloat(campaign.raised) / parseFloat(campaign.goal)) * 100).toFixed(1)}% of goal reached
              </p>
            </div>
          </div>

          {campaign.active && (
            <div className="donation-section">
              <h3>Make a Donation</h3>
              <form onSubmit={handleDonate}>
                <div className="form-group">
                  <label htmlFor="amount">Amount (ETH)</label>
                  <input
                    type="number"
                    id="amount"
                    value={donationAmount}
                    onChange={(e) => setDonationAmount(e.target.value)}
                    placeholder="Enter amount in ETH"
                    step="0.01"
                    min="0.01"
                    required
                  />
                </div>

                {donationError && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="error"
                  >
                    {donationError}
                  </motion.div>
                )}

                {donationSuccess && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="status"
                  >
                    {donationSuccess}
                  </motion.div>
                )}

                <motion.button
                  type="submit"
                  className="button-primary"
                  disabled={donating || !account}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {donating ? (
                    <>
                      <div className="loading-spinner"></div>
                      Processing...
                    </>
                  ) : (
                    <>
                      <i className="fas fa-heart"></i>
                      Donate Now
                    </>
                  )}
                </motion.button>
              </form>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default CampaignDetails; 