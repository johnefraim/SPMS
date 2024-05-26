import { useState, useEffect } from 'react';
import axios from 'axios';
import { headers } from 'next/headers';
import PortfolioConfig from './portfolioInputComponent/portfolioConfig';
import Link from 'next/link';
import { Link as LucideLink } from 'lucide-react';

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
    const [selectedPortfolio, setSelectedPortfolio] = useState<Portfolio>({
        portfolioTitle: '',
        category: '',
        description: '',
        tagsKeywords: '',
    });

    useEffect(() => {
        const token = localStorage.getItem('token');
        if(token){
            const decodedToken = JSON.parse(atob(token.split('.')[1]));
            const userId = decodedToken.Id;
            axios.get(`http://localhost:8080/api/portfolio/${userId.toString()}`, 
        {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
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
        axios.post('http://localhost:8080/api/portfolio/create', portfolio,
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
        })
        .then(response => {
            setPortfolios(prevPortfolios => [...prevPortfolios, response.data]);
            setRefresh(!refresh);
        })
            .catch(error => console.error('Error creating portfolio:', error));
    };

    const updatePortfolio = (portfolio: Portfolio) => {
        axios.put(`http://localhost:8080/api/portfolio/update/${portfolio.id}`, portfolio,
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
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
        axios.delete(`http://localhost:8080/api/portfolio/delete/${portfolio.id}`,
        {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
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
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 p-4">
            {portfolios.map(portfolio => (
                <div key={portfolio.id} className="p-6 bg-white rounded-lg shadow-md transform transition duration-500 hover:scale-105">
                    <h2 className="text-2xl font-bold mb-3">{portfolio.portfolioTitle}</h2>
                    <p className="text-gray-600 mb-2">{portfolio.category}</p>
                    <p className="text-gray-600 mb-4">{portfolio.description}</p>
                    <p className="text-gray-600 mb-4">{portfolio.tagsKeywords}</p>
                    <div className="flex space-x-2 mb-4">
                        <button 
                            onClick={() => setSelectedPortfolio(portfolio)} 
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                        >
                            Edit
                        </button>
                        <button 
                            onClick={() => deletePortfolio(portfolio)} 
                            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
                        >
                            Delete
                        </button>
                    </div>
                    <Link href={`/dashboard/student/portfolio`} passHref>
                            <LucideLink className="inline-block" />
                    </Link>
                    <PortfolioConfig />
                </div>
            ))}
        </div>
        </div>
    );
};

export default PortfolioCRUD;
