# Real-time API Fetching Approaches

## Overview
This document explains various approaches for fetching real-time data in our React dashboard project, along with implementation examples for connecting to actual APIs.

## Real-time Data Approaches

### 1. Polling (Interval-based Updates)
**Best for:** Data that updates periodically but not constantly

**How it works:**
- Client makes HTTP requests at regular intervals
- Server responds with latest data
- Simple to implement but can be inefficient

**Implementation Example:**
```javascript
// Using React Query with polling
import { useQuery } from '@tanstack/react-query';

export const useRealTimeMetrics = () => {
  return useQuery({
    queryKey: ['metrics'],
    queryFn: async () => {
      const response = await fetch('https://api.example.com/metrics');
      if (!response.ok) {
        throw new Error('Failed to fetch metrics');
      }
      return response.json();
    },
    // Refetch every 30 seconds
    refetchInterval: 30000,
    // Refetch when window regains focus
    refetchOnWindowFocus: true,
  });
};
```

### 2. Server-Sent Events (SSE)
**Best for:** One-way real-time updates from server to client

**How it works:**
- Server maintains persistent HTTP connection
- Server pushes updates to client as they happen
- More efficient than polling for frequent updates

**Implementation Example:**
```javascript
// Custom hook for SSE
import { useState, useEffect } from 'react';

export const useSSE = (url) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const eventSource = new EventSource(url);

    eventSource.onmessage = (event) => {
      try {
        const parsedData = JSON.parse(event.data);
        setData(parsedData);
      } catch (err) {
        setError('Failed to parse SSE data');
      }
    };

    eventSource.onerror = (err) => {
      setError('SSE connection error');
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, [url]);

  return { data, error };
};

// Using the SSE hook
// const { data, error } = useSSE('https://api.example.com/events');
```

### 3. WebSocket
**Best for:** Bidirectional real-time communication

**How it works:**
- Full-duplex communication channel
- Both client and server can send messages anytime
- Most efficient for real-time applications

**Implementation Example:**
```javascript
// Custom hook for WebSocket
import { useState, useEffect, useRef } from 'react';

export const useWebSocket = (url) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [connected, setConnected] = useState(false);
  const wsRef = useRef(null);

  useEffect(() => {
    const ws = new WebSocket(url);
    wsRef.current = ws;

    ws.onopen = () => {
      setConnected(true);
      console.log('WebSocket connected');
    };

    ws.onmessage = (event) => {
      try {
        const parsedData = JSON.parse(event.data);
        setData(parsedData);
      } catch (err) {
        setError('Failed to parse WebSocket data');
      }
    };

    ws.onerror = (err) => {
      setError('WebSocket error');
    };

    ws.onclose = () => {
      setConnected(false);
      console.log('WebSocket disconnected');
    };

    return () => {
      ws.close();
    };
  }, [url]);

  const sendMessage = (message) => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify(message));
    }
  };

  return { data, error, connected, sendMessage };
};

// Using the WebSocket hook
// const { data, error, connected, sendMessage } = useWebSocket('wss://api.example.com/ws');
```

### 4. GraphQL Subscriptions
**Best for:** Applications using GraphQL with real-time requirements

**How it works:**
- Extends GraphQL with real-time capabilities
- Uses WebSocket under the hood
- Works seamlessly with existing GraphQL queries/mutations

**Implementation Example:**
```javascript
// Using Apollo Client for GraphQL subscriptions
import { useSubscription, gql } from '@apollo/client';

const METRICS_SUBSCRIPTION = gql`
  subscription OnMetricsUpdate {
    metricsUpdated {
      id
      title
      value
      change
      positive
    }
  }
`;

export const useMetricsSubscription = () => {
  return useSubscription(METRICS_SUBSCRIPTION);
};

// Using the subscription hook
// const { data, loading, error } = useMetricsSubscription();
```

## Connecting Our Dashboard to Real APIs

### Updating Our Current Implementation

To connect our dashboard to actual APIs, we need to modify our mock API service:

**1. Update `src/services/mockApi.js` to connect to real endpoints:**

```javascript
// Replace mock functions with real API calls
export const fetchMetrics = async () => {
  const response = await fetch('https://api.yourdomain.com/dashboard/metrics', {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
      'Content-Type': 'application/json',
    },
  });
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  const data = await response.json();
  return data.metrics; // Adjust based on your API response structure
};

// Similar updates for chart data functions
export const fetchBarChartData = async () => {
  const response = await fetch('https://api.yourdomain.com/dashboard/charts/revenue', {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
      'Content-Type': 'application/json',
    },
  });
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  const data = await response.json();
  return data.data; // Adjust based on your API response structure
};
```

**2. Add authentication and error handling:**

```javascript
// Enhanced API service with authentication
const API_BASE_URL = 'https://api.yourdomain.com';

const apiClient = async (endpoint, options = {}) => {
  const token = localStorage.getItem('authToken');
  
  const config = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` }),
    },
    ...options,
  };

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    
    if (!response.ok) {
      if (response.status === 401) {
        // Handle unauthorized access
        localStorage.removeItem('authToken');
        window.location.href = '/login';
        throw new Error('Unauthorized access');
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
};

export const fetchMetrics = async () => {
  const data = await apiClient('/dashboard/metrics');
  return data.metrics;
};
```

**3. Environment-specific configuration:**

```javascript
// src/config/api.js
const config = {
  development: {
    apiUrl: 'http://localhost:3001/api',
  },
  production: {
    apiUrl: 'https://api.yourdomain.com',
  },
};

export const API_BASE_URL = config[process.env.NODE_ENV]?.apiUrl || config.development.apiUrl;
```

## Recommendations

1. **For Periodic Updates:** Use polling with React Query (our current approach)
2. **For Frequent One-way Updates:** Use Server-Sent Events
3. **For Bidirectional Communication:** Use WebSockets
4. **For GraphQL Applications:** Use GraphQL Subscriptions

## Implementation Steps

1. Replace mock API endpoints with your actual API URLs
2. Add proper authentication headers
3. Implement error handling for network failures
4. Configure appropriate refetch intervals based on data update frequency
5. Add request/response interceptors for logging and debugging
6. Implement retry mechanisms for failed requests
7. Add caching strategies to reduce server load

The current implementation using React Query is already well-suited for real APIs. Simply replace the mock functions in `src/services/mockApi.js` with actual API calls, and the rest of the dashboard will work seamlessly with real-time data.