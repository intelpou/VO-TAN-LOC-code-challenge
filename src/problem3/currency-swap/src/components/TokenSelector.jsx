import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import fetchTokenPrices from '../utils/fetchTokenPrices';
import getTokenImage from '../utils/getTokenImage';
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";

const TokenSelect = (props) => {
  const { setSelectedToken, label, ...other } = props;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedValue, setSelectedValue] = useState(null);
  const [tokenPrices, setTokenPrices] = useState({});

  useEffect(() => {
    const fetchTokenData = async () => {
      try {
        const priceData = await fetchTokenPrices();

        // Handle to remove duplicate tokens
        const priceMap = {};
        priceData.forEach((token) => {
          const symbol = token.currency;
          token.icon = getTokenImage(symbol);
          priceMap[token.currency] = token;
        });

        setTokenPrices(priceMap);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
        console.error("Error fetching token data:", err);
      }
    };

    fetchTokenData();
  }, []);

  const handleChange = (event, value) => {
    setSelectedToken(value);
    setSelectedValue(value);
    console.log("Selected Token:", value); // Log the selected token object
  };

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="56px"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Typography color="error">Error: {error.message}</Typography>;
  }

  return (
    <Autocomplete
      disablePortal
      id="token-select"
      options={Object.values(tokenPrices)}
      getOptionLabel={(option) => option.currency}
      value={selectedValue}
      onChange={handleChange}
      renderInput={(params) => <TextField {...params} label={label ? label : "Select a Token"} />}
      renderOption={(props, option) => {
        const { key, ...optionProps } = props;
        return (
        <Box
          key={key}
          component="li"
          sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
          {...optionProps}
        >
          <Avatar sx={{ mr: 1 }} src={option.icon} alt={option.currency} />
          {option.currency}
          {option.price && (
            <Typography sx={{ ml: 1 }}>(${parseFloat(option.price).toFixed(2)})</Typography>
          )}
        </Box>
      )}}
    />
  );
};

TokenSelect.propTypes = {
  setSelectedToken: PropTypes.func
};

export default TokenSelect;
