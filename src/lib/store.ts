import { create } from 'zustand';
import axios from 'axios';

interface PortfolioStore {
  portfolios: any[];
  apiUrl: string;
  error: string | null;
  fetchPortfolios: () => Promise<void>;
}

export const usePortfolioStore = create<PortfolioStore>((set, get) => ({
  portfolios: [],
  apiUrl: process.env.REACT_APP_API_URL || 'http://localhost:8080',
  error: null,
  fetchPortfolios: async function () { 
    try {
      const apiUrl = get().apiUrl;
      const response = await axios.get(`${apiUrl}/public/portfolio/all`); 
      set({ portfolios: response.data });
    } catch (error) {
      console.error(error);
      set({ error: 'Failed to fetch portfolios' });
    }
  },
}));

export default usePortfolioStore;