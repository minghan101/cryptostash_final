// src/components/ProfitLossTracker.js

import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import ProfitLossForm from './ProfitLossForm';
import GroupedBarChart from './GroupedBarChart';
import TransactionRecord from './TransactionRecord';
import "./ProfitLossTracker.css";

const ProfitLossTracker = () => {
  return (
    <Container className="profit-loss-tracker-container">
      <Typography variant="h6" className="profit-loss-tracker-title" fontFamily={'Montserrat'} fontWeight={'bold'} fontSize={'2.0rem'}>
        Profit and Loss Realization Tracker
      </Typography>
      <Box className="profit-loss-tracker-content">
        <Box className="profit-loss-tracker-form">
          <ProfitLossForm />
        </Box>
        <Box className="transaction-record-container">
          <TransactionRecord />
        </Box>
      </Box>
      <GroupedBarChart />
    </Container>
  );
};

export default ProfitLossTracker;

