import { useQuery } from '@tanstack/react-query';
import { fetchMetrics } from '../services/mockApi';

export const useMetrics = () => {
  return useQuery({
    queryKey: ['metrics'],
    queryFn: fetchMetrics,
    staleTime: 60000, // 1 minute
    refetchInterval: 300000, // 5 minutes
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
  });
};