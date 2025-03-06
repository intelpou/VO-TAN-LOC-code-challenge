import axios from 'axios';
import { delay } from './commonFunctions';

const fetchTokenPrices = async () => {
  try {
    const response = await axios.get('https://interview.switcheo.com/prices.json');
    await delay(800);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch token prices:', error);
    return {};
  }
};

export default fetchTokenPrices;
