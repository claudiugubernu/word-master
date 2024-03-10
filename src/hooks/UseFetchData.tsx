import { useState, useEffect } from 'react';
import { GameProps } from '../@types/types';

const UseFetchData = (url: string): GameProps[] => {
  const [data, setData] = useState<GameProps[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const jsonData: GameProps[] = await response.json();
        setData(jsonData);
      } catch (error: any) {
        console.error('Error fetching data:', error.message);
      }
    };

    fetchData();

    // Cleanup function to cancel fetch request if component unmounts
    return () => {
      // Cleanup code here if needed
    };
  }, [url]);

  return data;
};

export default UseFetchData;
