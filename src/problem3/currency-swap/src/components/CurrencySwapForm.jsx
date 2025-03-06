import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TokenSelector from './TokenSelector';
import { Box, Button, TextField, Typography } from '@mui/material';
import { delay } from '../utils/commonFunctions';
import CircularProgress from "@mui/material/CircularProgress";

const CurrencySwapForm = () => {
  const [amount, setAmount] = useState('');
  const [fromToken, setFromToken] = useState('');
  const [toToken, setToToken] = useState('');
  const [swapResult, setSwapResult] = useState('');
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
  }, []);

  const handleSwap = async (e) => {
    e.preventDefault();
    if (!amount || !fromToken || !toToken) {
      setError('Please fill in all fields.');
      return;
    }

    try {
      const fromPrice = fromToken.price;
      const toPrice = toToken.price;
      if (!fromPrice || !toPrice) {
        setError('One or both tokens do not have a price.');
        return;
      }

      setSubmitting(true);
      const swapAmount = (amount * fromPrice) / toPrice;
      await delay(800);
      setSwapResult(`You will receive ${swapAmount} ${toToken.currency}`);
      setError(null);
      setSubmitting(false);
    } catch (error) {
      setError('An error occurred during the swap.');
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSwap}>
      <Box className="form-group">
        <Typography>This is a currency swap form for swapping assets from one currency to another:</Typography>
        <TextField id="outlined-basic" label="Amount" variant="outlined" fullWidth value={amount} onChange={(e) => setAmount(e.target.value)} required />
      </Box>
      <Box className="form-group"><TokenSelector setSelectedToken={setFromToken} label="From Token"/></Box>
      <Box className="form-group"><TokenSelector setSelectedToken={setToToken} label="To Token"/></Box>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Button type="submit" disabled={submitting}>CONFIRM SWAP</Button>
        {submitting && <CircularProgress />}
      </Box>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {swapResult && <p>{swapResult}</p>}
    </form>
  );
};

export default CurrencySwapForm;
