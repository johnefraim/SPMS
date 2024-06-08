'use client';
import { usePortfolioStore } from '@/lib/seachStore';
import { LucideLink } from 'lucide-react';
import Link from 'next/link';

const SeachPortfolio = () => {
  const { search, setSearch, searchCriteria, setSearchCriteria, fetchPortfolios, error, portfolios } = usePortfolioStore();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleCriteriaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchCriteria(e.target.value as 'keyword' | 'title' | 'description');
  };

  const handleSearchSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await fetchPortfolios();
  };

  return (
    <div className="flex flex-col mt-8">
      <div className="flex justify-center">
  <form onSubmit={handleSearchSubmit} className="flex flex-row items-center mb-4 space-x-4">
    <select value={searchCriteria} onChange={handleCriteriaChange} className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
      <option value="keyword">Keyword</option>
      <option value="title">Title</option>
      <option value="description">Description</option>
    </select>
    <input
      type="text"
      value={search}
      onChange={handleSearch}
      placeholder="Search Portfolio"
      className="w-full max-w-md p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
    <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
      Search
    </button>
  </form>
</div>

      {error && <p className="text-red-500">{error}</p>}
      <div>
      <ul className="flex flex-wrap justify-center">
        {portfolios.length > 0 ? (
          portfolios.map((portfolio) => (
            <li key={portfolio.id} className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 p-4">
            <div className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow duration-300">
              <h2 className="text-2xl font-semibold mb-2">{portfolio.portfolioTitle}</h2>
              <p className="text-gray-700 mb-4">{portfolio.description}</p>
              <p className="text-gray-500 mb-2">{portfolio.category}</p>
              <p className="text-gray-500 mb-4">{portfolio.tagsKeywords}</p>
              <Link href={`/portfolios/${portfolio.id}`} className="text-orange-600 hover:text-orange-800 flex items-center">
                <LucideLink className="mr-2" />
                View
              </Link>
            </div>
          </li>
        
          ))
          
        ) : (
          <p></p>
        )}
        </ul>
      </div>
    </div>
  );
};

export default SeachPortfolio;
