import { create } from 'zustand';
import axios from 'axios';

interface PortfolioStore {
  search: string;
  searchCriteria: 'keyword' | 'title' | 'description';
  setSearch: (search: string) => void;
  setSearchCriteria: (criteria: 'keyword' | 'title' | 'description') => void;
  apiUrl: string | undefined;
  error: string | null;
  portfolios: any[];
  fetchPortfolios: () => Promise<void>;
}

export const usePortfolioStore = create<PortfolioStore>((set, get) => ({
  search: "",
  searchCriteria: 'keyword',
  setSearch: (search: string) => set({ search }),
  setSearchCriteria: (criteria: 'keyword' | 'title' | 'description') => set({ searchCriteria: criteria }),
  apiUrl: process.env.NEXT_PUBLIC_API_URL,
  error: null,
  portfolios: [],
  fetchPortfolios: async () => {
    try {
      const apiUrl = get().apiUrl;
      const search = get().search;
      const criteria = get().searchCriteria;
      if (!apiUrl) {
        throw new Error('API URL is not defined');
      }
      const response = await axios.get(`${apiUrl}/public/portfolio/search/${criteria}/${search}`);
      set({ portfolios: response.data, error: null });
    } catch (error) {
      console.error(error);
      set({ error: 'Failed to fetch portfolios', portfolios: [] });
    }
  },
}));
