import { create } from 'zustand';
import axios from 'axios';

interface PortfolioStore {
  portfolios: any[];
  apiUrl: any;
  error: string | null;
  fetchPortfolios: () => Promise<void>;
}

export const usePortfolioStore = create<PortfolioStore>((set, get) => ({
  portfolios: [],
  apiUrl: process.env.NEXT_PUBLIC_API_URL,
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