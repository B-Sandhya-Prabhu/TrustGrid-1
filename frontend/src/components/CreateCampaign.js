import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ethers } from 'ethers';

const CreateCampaign = ({ contract, account }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const formData = new FormData(e.target);
      const title = formData.get('title');
      const description = formData.get('description');
      const beneficiary = formData.get('beneficiary');
      const goal = formData.get('goal');
      const duration = formData.get('duration');

      // Validate inputs
      if (!title || !description || !beneficiary || !goal || !duration) {
        throw new Error('All fields are required');
      }

      if (!ethers.utils.isAddress(beneficiary)) {
        throw new Error('Invalid beneficiary address');
      }

      if (isNaN(goal) || parseFloat(goal) <= 0) {
        throw new Error('Goal amount must be greater than 0');
      }

      if (isNaN(duration) || parseInt(duration) <= 0) {
        throw new Error('Duration must be greater than 0');
      }

      const tx = await contract.createCampaign(
        title,
        description,
        beneficiary,
        ethers.utils.parseEther(goal),
        parseInt(duration)
      );

      setSuccess('Creating campaign...');
      await tx.wait();
      setSuccess('Campaign created successfully!');
      
      // Reset form
      e.target.reset();
      
      // Redirect to campaigns page after 2 seconds
      setTimeout(() => {
        navigate('/campaigns');
      }, 2000);
    } catch (error) {
      console.error('Error creating campaign:', error);
      setError(error.message || 'Failed to create campaign');
    } finally {
      setLoading(false);
    }
  };

  if (!account) {
    return (
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="error"
        >
          Please connect your wallet to create a campaign
        </motion.div>
      </div>
    );
  }

  return (
    <div className="container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="create-campaign"
      >
        <h2>Create a New Campaign</h2>
        <form onSubmit={handleSubmit} className="campaign-form">
          <div className="form-group">
            <label htmlFor="title">Campaign Title</label>
            <input
              type="text"
              id="title"
              name="title"
              placeholder="Enter campaign title"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              placeholder="Describe your campaign"
              required
              rows="4"
            />
          </div>

          <div className="form-group">
            <label htmlFor="beneficiary">Beneficiary Address</label>
            <input
              type="text"
              id="beneficiary"
              name="beneficiary"
              placeholder="Enter Ethereum address"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="goal">Goal Amount (ETH)</label>
            <input
              type="number"
              id="goal"
              name="goal"
              placeholder="Enter amount in ETH"
              step="0.01"
              min="0.01"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="duration">Duration (days)</label>
            <input
              type="number"
              id="duration"
              name="duration"
              placeholder="Enter campaign duration in days"
              min="1"
              required
            />
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="error"
            >
              {error}
            </motion.div>
          )}

          {success && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="status"
            >
              {success}
            </motion.div>
          )}

          <motion.button
            type="submit"
            className="button-primary"
            disabled={loading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {loading ? (
              <>
                <div className="loading-spinner"></div>
                Creating Campaign...
              </>
            ) : (
              <>
                <i className="fas fa-plus-circle"></i>
                Create Campaign
              </>
            )}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default CreateCampaign; 