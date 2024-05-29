'use client'
import PortfolioDetails from '@/components/mycomponents/portfoliDetailsTemplate/portfolioDetailsById';
import { useParams } from 'next/navigation';
export default function Page() {
    const params = useParams();
    const id = params.id as string;
  return <PortfolioDetails id={id}/>;
}