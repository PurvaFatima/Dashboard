import { useQuery } from '@tanstack/react-query';
import { 
  fetchBarChartData, 
  fetchLineChartData, 
  fetchPieChartData, 
  fetchScatterChartData 
} from '../services/mockApi';

export const useBarChartData = () => {
  return useQuery({
    queryKey: ['barChart'],
    queryFn: fetchBarChartData,
    staleTime: 120000, // 2 minutes
    refetchInterval: 600000, // 10 minutes
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
  });
};

export const useLineChartData = () => {
  return useQuery({
    queryKey: ['lineChart'],
    queryFn: fetchLineChartData,
    staleTime: 120000, // 2 minutes
    refetchInterval: 600000, // 10 minutes
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
  });
};

export const usePieChartData = () => {
  return useQuery({
    queryKey: ['pieChart'],
    queryFn: fetchPieChartData,
    staleTime: 120000, // 2 minutes
    refetchInterval: 600000, // 10 minutes
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
  });
};

export const useScatterChartData = () => {
  return useQuery({
    queryKey: ['scatterChart'],
    queryFn: fetchScatterChartData,
    staleTime: 120000, // 2 minutes
    refetchInterval: 600000, // 10 minutes
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
  });
};