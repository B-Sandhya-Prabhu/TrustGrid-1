// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract CharityPlatform is Ownable, ReentrancyGuard {
    struct Campaign {
        uint256 id;
        string title;
        string description;
        address payable beneficiary;
        uint256 goal;
        uint256 raised;
        uint256 deadline;
        bool active;
    }

    struct Donation {
        address donor;
        uint256 amount;
        uint256 timestamp;
    }

    uint256 public campaignCount;
    mapping(uint256 => Campaign) public campaigns;
    mapping(uint256 => Donation[]) public campaignDonations;
    mapping(address => uint256[]) public userDonations;

    event CampaignCreated(uint256 indexed campaignId, string title, uint256 goal);
    event DonationMade(uint256 indexed campaignId, address indexed donor, uint256 amount);
    event CampaignCompleted(uint256 indexed campaignId, uint256 totalRaised);

    function createCampaign(
        string memory _title,
        string memory _description,
        address payable _beneficiary,
        uint256 _goal,
        uint256 _durationInDays
    ) public returns (uint256) {
        require(_beneficiary != address(0), "Invalid beneficiary address");
        require(_goal > 0, "Goal must be greater than 0");
        require(_durationInDays > 0, "Duration must be greater than 0");

        campaignCount++;
        uint256 campaignId = campaignCount;

        campaigns[campaignId] = Campaign({
            id: campaignId,
            title: _title,
            description: _description,
            beneficiary: _beneficiary,
            goal: _goal,
            raised: 0,
            deadline: block.timestamp + (_durationInDays * 1 days),
            active: true
        });

        emit CampaignCreated(campaignId, _title, _goal);
        return campaignId;
    }

    function donate(uint256 _campaignId) public payable nonReentrant {
        Campaign storage campaign = campaigns[_campaignId];
        require(campaign.active, "Campaign is not active");
        require(block.timestamp <= campaign.deadline, "Campaign has ended");
        require(msg.value > 0, "Donation amount must be greater than 0");

        campaign.raised += msg.value;
        
        campaignDonations[_campaignId].push(Donation({
            donor: msg.sender,
            amount: msg.value,
            timestamp: block.timestamp
        }));

        userDonations[msg.sender].push(_campaignId);

        emit DonationMade(_campaignId, msg.sender, msg.value);

        if (campaign.raised >= campaign.goal) {
            campaign.active = false;
            emit CampaignCompleted(_campaignId, campaign.raised);
        }
    }

    function withdrawFunds(uint256 _campaignId) public nonReentrant {
        Campaign storage campaign = campaigns[_campaignId];
        require(msg.sender == campaign.beneficiary, "Only beneficiary can withdraw");
        require(!campaign.active || block.timestamp > campaign.deadline, "Campaign is still active");
        require(campaign.raised > 0, "No funds to withdraw");

        uint256 amount = campaign.raised;
        campaign.raised = 0;
        campaign.active = false;

        (bool success, ) = campaign.beneficiary.call{value: amount}("");
        require(success, "Transfer failed");
    }

    function getCampaign(uint256 _campaignId) public view returns (
        uint256 id,
        string memory title,
        string memory description,
        address beneficiary,
        uint256 goal,
        uint256 raised,
        uint256 deadline,
        bool active
    ) {
        Campaign storage campaign = campaigns[_campaignId];
        return (
            campaign.id,
            campaign.title,
            campaign.description,
            campaign.beneficiary,
            campaign.goal,
            campaign.raised,
            campaign.deadline,
            campaign.active
        );
    }

    function getCampaignDonations(uint256 _campaignId) public view returns (Donation[] memory) {
        return campaignDonations[_campaignId];
    }

    function getUserDonations(address _user) public view returns (uint256[] memory) {
        return userDonations[_user];
    }
} 