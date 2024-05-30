
import { useState, useEffect } from 'react';
import axios from 'axios';
import PortfolioConfig from './portfolioInputComponent/portfolioConfig';
import Link from 'next/link';
import { Link as LucideLink } from 'lucide-react';
import { getToken } from '@/app/api/authService';

interface Portfolio {
    id?: number;
    portfolioTitle: string;
    category: string;
    description: string;
    tagsKeywords: string;
}

const PortfolioCRUD: React.FC = () => {
    const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
    const [refresh, setRefresh] = useState(false);
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const [selectedPortfolio, setSelectedPortfolio] = useState<Portfolio>({
        portfolioTitle: '',
        category: '',
        description: '',
        tagsKeywords: '',
    });

    useEffect(() => {
        const token = getToken();
        if(token){
            const decodedToken = JSON.parse(atob(token.split('.')[1]));
            const userId = decodedToken.Id;
            axios.get(`${apiUrl}/api/portfolio/${userId.toString()}`, 
        {
            headers: {
                'Authorization': `Bearer ${getToken()}`,
            },
        }
        )
            .then(response => setPortfolios(response.data))
            .catch(error => console.error('Error fetching portfolios:', error));
        }
    }, [refresh]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setSelectedPortfolio(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (selectedPortfolio.id) {
            updatePortfolio(selectedPortfolio);
        } else {
            createPortfolio(selectedPortfolio);
        }
        setSelectedPortfolio({
            portfolioTitle: '',
            category: '',
            description: '',
            tagsKeywords: '',
        });
    };

    const createPortfolio = (portfolio: Portfolio) => {
        axios.post(`${apiUrl}/api/portfolio/create`, portfolio,
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getToken()}`,
            },
        })
        .then(response => {
            setPortfolios(prevPortfolios => [...prevPortfolios, response.data]);
            setRefresh(!refresh);
        })
            .catch(error => console.error('Error creating portfolio:', error));
    };

    const updatePortfolio = (portfolio: Portfolio) => {
        axios.put(`${apiUrl}/api/portfolio/update/${portfolio.id}`, portfolio,
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getToken()}`,
            },
        }
        )
            .then(response => setPortfolios(prevPortfolios => 
                prevPortfolios.map(p => p.id === response.data.id ? response.data : p)
                
            ))
            .catch(error => console.error('Error updating portfolio:', error));

            setSelectedPortfolio({
                portfolioTitle: '',
                category: '',
                description: '',
                tagsKeywords: '',
            });
    };

    const deletePortfolio = (portfolio: Portfolio) => {
        axios.delete(`${apiUrl}/api/portfolio/delete/${portfolio.id}`,
        {
            headers: {
                'Authorization': `Bearer ${getToken()}`,
            },
        }
        )
            .then(() => setPortfolios(prevPortfolios => 
                prevPortfolios.filter(p => p.id !== portfolio.id)
            ))
            .catch(error => console.error('Error deleting portfolio:', error));
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1>Create Portfolio</h1>
            <form onSubmit={handleFormSubmit} className="mb-6 p-4 bg-white rounded shadow-md">
                <div className="mb-4">
                    <input
                        type="text"
                        name="portfolioTitle"
                        value={selectedPortfolio.portfolioTitle}
                        onChange={handleInputChange}
                        placeholder="Portfolio Title"
                        required
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>
                <div className="mb-4">
                    <input
                        type="text"
                        name="category"
                        value={selectedPortfolio.category}
                        onChange={handleInputChange}
                        placeholder="Category"
                        required
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>
                <div className="mb-4">
                    <textarea
                        name="description"
                        value={selectedPortfolio.description}
                        onChange={handleInputChange}
                        placeholder="Description"
                        required
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>
                <div className="mb-4">
                    <input
                        type="text"
                        name="tagsKeywords"
                        value={selectedPortfolio.tagsKeywords}
                        onChange={handleInputChange}
                        placeholder="Tags/Keywords"
                        required
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>
                <button type="submit" className="mr-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                    Save
                </button>
                <button 
                type="button" 
                onClick={() => selectedPortfolio.id && updatePortfolio(selectedPortfolio)} 
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                >
                    Update
                </button>
            </form>
            <h1>Portfolio Lists</h1>
            <div className="container mx-auto p-4">
            <div className="container mx-auto p-4">
            <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {portfolios.map((portfolio) => (
          <div key={portfolio.id} className="shadow-md rounded-lg overflow-hidden">
            <div className="bg-white p-6">
              <h2 className="text-lg font-bold mb-3">{portfolio.portfolioTitle}</h2>
              <p className="text-gray-600 mb-2">{portfolio.category}</p>
              <p className="text-gray-600 mb-4">{portfolio.description}</p>
              <p className="text-gray-600 mb-4">{portfolio.tagsKeywords}</p>
              <div className="flex justify-between items-center mb-4">
                <div>
                  <button
                    onClick={() => setSelectedPortfolio(portfolio)}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deletePortfolio(portfolio)}
                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                  >
                    Delete
                  </button>
                </div>
                <Link href={`/dashboard/student/portfolio/${portfolio.id}`}>
                    <LucideLink className="inline-block text-gray-600 hover:text-gray-900" />
                    View
                </Link>
              </div>
              {portfolio.id && <PortfolioConfig portfolioAttribute={portfolio.id} />}
            </div>
          </div>
        ))}
      </div>
    </div>
</div>
</div>
        </div>
    );
};

export default PortfolioCRUD;
