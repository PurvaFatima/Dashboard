// Example hook for real API implementation
// This shows how to replace the mock API with real API calls

import { useQuery } from '@tanstack/react-query';
import { fetchMetrics } from '../services/realApi';

// For real-time updates with polling
export const useMetricsReal = () => {
  return useQuery({
    queryKey: ['metrics'],
    queryFn: fetchMetrics,
    // Cache for 1 minute
    staleTime: 60000,
    // Refetch every 5 minutes
    refetchInterval: 300000,
    // Refetch when window regains focus
    refetchOnWindowFocus: true,
    // Refetch on reconnect
    refetchOnReconnect: true,
    // Retry failed requests up to 3 times
    retry: 3,
    // Retry delay increases exponentially
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
};

// For real-time updates with WebSocket
export const useMetricsWebSocket = () => {
  // This would require a custom hook implementation
  // See src/services/realApi.js for WebSocket connection example
};

// For real-time updates with SSE
export const useMetricsSSE = () => {
  // This would require a custom hook implementation
  // See src/services/realApi.js for SSE connection example
};