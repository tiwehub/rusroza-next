// src/pages/index.tsx
import React from 'react';
import { useQuery } from '@apollo/client';
import GET_ALL_STOCKS from '@/graphql/queries/GetAllStocks';
import StockCard from '@/components/UI/Card/StockCard';

const Home: React.FC = () => {
  const { loading, error, data } = useQuery(GET_ALL_STOCKS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>Посты</h1>
      <ul>
        {data.posts.nodes.map((post: any) => (
          <StockCard key={post.id} post={post} />
        ))}
      </ul>
    </div>
  );
};

export default Home;
