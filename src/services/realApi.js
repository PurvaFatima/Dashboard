// Real API service implementation
// This file shows how to replace the mock API with actual API calls

// Configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://api.yourdomain.com';
const REFRESH_TOKEN_URL = `${API_BASE_URL}/auth/refresh`;

// Utility function for API requests with authentication
const apiRequest = async (endpoint, options = {}) => {
  const accessToken = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');

  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...(accessToken && { 'Authorization': `Bearer ${accessToken}` }),
    },
    ...options,
  };

  try {
    let response = await fetch(`${API_BASE_URL}${endpoint}`, config);

    // Handle expired access token
    if (response.status === 401 && refreshToken) {
      // Try to refresh the token
      const refreshResponse = await fetch(REFRESH_TOKEN_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refreshToken }),
      });

      if (refreshResponse.ok) {
        const { accessToken: newAccessToken } = await refreshResponse.json();
        localStorage.setItem('accessToken', newAccessToken);

        // Retry the original request with new token
        config.headers.Authorization = `Bearer ${newAccessToken}`;
        response = await fetch(`${API_BASE_URL}${endpoint}`, config);
      } else {
        // Refresh failed, redirect to login
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        window.location.href = '/login';
        throw new Error('Authentication failed');
      }
    }

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`API request failed for ${endpoint}:`, error);
    throw error;
  }
};

// Real API functions
export const fetchMetrics = async () => {
  const data = await apiRequest('/dashboard/metrics');
  return data.metrics.map(metric => ({
    id: metric.id,
    title: metric.name,
    value: metric.currentValue,
    change: metric.percentageChange,
    positive: metric.percentageChange >= 0,
  }));
};

export const fetchBarChartData = async () => {
  const data = await apiRequest('/dashboard/charts/revenue');
  return data.data.map(item => ({
    name: item.month,
    value: item.revenue,
  }));
};

export const fetchLineChartData = async () => {
  const data = await apiRequest('/dashboard/charts/activity');
  return data.data.map(item => ({
    name: item.day,
    value: item.activityCount,
  }));
};

export const fetchPieChartData = async () => {
  const data = await apiRequest('/dashboard/charts/market-share');
  return data.data.map(item => ({
    name: item.category,
    value: item.share,
  }));
};

export const fetchScatterChartData = async () => {
  const data = await apiRequest('/dashboard/charts/performance');
  return data.data.map(item => ({
    x: item.metric1,
    y: item.metric2,
    z: item.metric3,
  }));
};

// Authentication functions
export const login = async (email, password) => {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'Login failed');
  }

  const data = await response.json();
  localStorage.setItem('accessToken', data.accessToken);
  localStorage.setItem('refreshToken', data.refreshToken);
  
  return data;
};

export const logout = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
};

// WebSocket connection for real-time updates
export const createWebSocketConnection = (onMessage, onError, onOpen, onClose) => {
  const wsUrl = API_BASE_URL.replace('http', 'ws') + '/ws/dashboard';
  const ws = new WebSocket(wsUrl);

  ws.onopen = (event) => {
    console.log('WebSocket connected');
    if (onOpen) onOpen(event);
  };

  ws.onmessage = (event) => {
    try {
      const data = JSON.parse(event.data);
      if (onMessage) onMessage(data);
    } catch (error) {
      console.error('Failed to parse WebSocket message:', error);
    }
  };

  ws.onerror = (event) => {
    console.error('WebSocket error:', event);
    if (onError) onError(event);
  };

  ws.onclose = (event) => {
    console.log('WebSocket disconnected');
    if (onClose) onClose(event);
  };

  return ws;
};

// SSE (Server-Sent Events) connection for real-time updates
export const createSSEConnection = (onMessage, onError) => {
  const eventSource = new EventSource(`${API_BASE_URL}/sse/dashboard`);

  eventSource.onmessage = (event) => {
    try {
      const data = JSON.parse(event.data);
      if (onMessage) onMessage(data);
    } catch (error) {
      console.error('Failed to parse SSE message:', error);
    }
  };

  eventSource.onerror = (event) => {
    console.error('SSE error:', event);
    if (onError) onError(event);
  };

  return eventSource;
};