'use client'
import PublicPortfolioDetails from '../../../components/mycomponents/portfolioshowroom/publicPortfolioTemplate';
import { useParams } from 'next/navigation';

export default function Page() {
    const params = useParams();
    const id = params.id as string;
  return <PublicPortfolioDetails id={id}/>;
  
}