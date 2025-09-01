# Switching from Mock Data to Real API

## Overview
This document explains how to switch the dashboard from using mock data to real API data.

## Steps to Connect to Real APIs

### 1. Update Environment Variables
Create a `.env` file in the project root:

```env
VITE_API_URL=https://api.yourdomain.com
```

### 2. Replace Mock API Service
Replace the import in your hooks from:
```javascript
import { fetchMetrics } from '../services/mockApi';
```

To:
```javascript
import { fetchMetrics } from '../services/realApi';
```

### 3. Update Hooks
Update `src/hooks/useMetrics.js`:

```javascript
// Before (mock data)
import { fetchMetrics } from '../services/mockApi';

// After (real data)
import { fetchMetrics } from '../services/realApi';
```

### 4. Configure API Endpoints
Update the endpoints in `src/services/realApi.js` to match your API:

```javascript
// Example API endpoints
export const fetchMetrics = async () => {
  const data = await apiRequest('/api/v1/dashboard/metrics');
  return data.metrics;
};

export const fetchBarChartData = async () => {
  const data = await apiRequest('/api/v1/dashboard/charts/revenue');
  return data.data;
};
```

### 5. Authentication Setup
If your API requires authentication:

1. Implement login functionality using the provided `login` function
2. Store tokens in localStorage
3. The `apiRequest` function will automatically include the authorization header

### 6. Real-time Updates Configuration
Choose the appropriate real-time update method:

#### Polling (Default - Current Implementation)
```javascript
// In your hook
refetchInterval: 300000, // 5 minutes
```

#### WebSocket Updates
```javascript
// In your component
import { createWebSocketConnection } from '../services/realApi';

useEffect(() => {
  const ws = createWebSocketConnection(
    (data) => {
      // Update state with new data
      setMetrics(data.metrics);
    },
    (error) => {
      console.error('WebSocket error:', error);
    }
  );

  return () => {
    ws.close();
  };
}, []);
```

#### Server-Sent Events (SSE)
```javascript
// In your component
import { createSSEConnection } from '../services/realApi';

useEffect(() => {
  const sse = createSSEConnection(
    (data) => {
      // Update state with new data
      setMetrics(data.metrics);
    },
    (error) => {
      console.error('SSE error:', error);
    }
  );

  return () => {
    sse.close();
  };
}, []);
```

## Example: Complete Switch to Real API

1. **Update the hook** (`src/hooks/useMetrics.js`):
```javascript
import { useQuery } from '@tanstack/react-query';
// Change this import
// import { fetchMetrics } from '../services/mockApi';
import { fetchMetrics } from '../services/realApi';

export const useMetrics = () => {
  return useQuery({
    queryKey: ['metrics'],
    queryFn: fetchMetrics,
    staleTime: 60000, // 1 minute
    refetchInterval: 300000, // 5 minutes for polling
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
  });
};
```

2. **Update API endpoints** (`src/services/realApi.js`):
```javascript
// Update these endpoints to match your API
export const fetchMetrics = async () => {
  const data = await apiRequest('/api/v1/dashboard/metrics');
  return data.metrics.map(metric => ({
    id: metric.id,
    title: metric.title,
    value: metric.value,
    change: metric.change,
    positive: metric.change >= 0,
  }));
};
```

3. **Set environment variables** (`.env`):
```env
VITE_API_URL=https://api.yourcompany.com
```

## Testing the Connection

1. Start the development server:
```bash
npm run dev
```

2. Check the browser console for any API errors
3. Verify data is loading correctly in the dashboard
4. Monitor network tab in browser dev tools to see API requests

## Troubleshooting

### Common Issues:
1. **CORS errors**: Ensure your API server has proper CORS configuration
2. **Authentication errors**: Verify tokens are being sent correctly
3. **404 errors**: Check that API endpoints are correct
4. **Network errors**: Verify API server is accessible

### Debugging Tips:
1. Use browser dev tools Network tab to inspect requests
2. Add console.log statements in your API service functions
3. Check React Query Devtools for query status
4. Verify environment variables are loaded correctly

The dashboard is now ready to connect to real APIs. Simply update the service endpoints and authentication as needed for your specific API.