import React, { useState } from 'react';

// Sample data for student portfolios
const studentPortfolios = [
  { id: 1, name: 'John Doe', image: '/john_doe_portfolio.jpg', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
  { id: 2, name: 'Jane Smith', image: '/jane_smith_portfolio.jpg', description: 'Nulla facilisi. Fusce non est vitae est blandit tincidunt ut in velit.' },
  // Add more sample portfolios as needed
];

interface Portfolio {
    id: number;
    name: string;
    image: string;
    description: string;
    }
interface PortfolioShowroomProps {
    portfolios: Portfolio[];
    }

interface PaginationProps {
    itemsPerPage: number;
    totalItems: number;
    paginate: (pageNumber: number) => void;
    }


const PortfolioShowroom = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; // Number of items to display per page

  // Calculate the index range for the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = studentPortfolios.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  //const paginate = () => setCurrentPage();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentItems.map(portfolio => (
          <div key={portfolio.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <img className="w-full h-48 object-cover" src={portfolio.image} alt={portfolio.name} />
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{portfolio.name}</h2>
              <p className="text-gray-700">{portfolio.description}</p>
            </div>
          </div>
        ))}
      </div>
      {/* Pagination */}
      <div className="mt-8">
        <ul className="flex justify-center">
          {Array.from({ length: Math.ceil(studentPortfolios.length / itemsPerPage) }, (_, index) => (
            <li key={index}>
              <button
                
                className={`px-4 py-2 mx-1 rounded-full focus:outline-none ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
              >
                {index + 1}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PortfolioShowroom;
