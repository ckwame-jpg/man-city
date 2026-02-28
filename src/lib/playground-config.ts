export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '';

export const DEMO_CREDENTIALS = {
  email: 'demo@habitual.dev',
  password: 'demo1234',
};

export interface Endpoint {
  method: string;
  path: string;
  description: string;
  requiresAuth: boolean;
  requestBody?: unknown;
  mockResponse: {
    status: number;
    body: unknown;
  };
}

export const endpoints: Endpoint[] = [
  {
    method: 'POST',
    path: '/register',
    description: 'Register a new user',
    requiresAuth: false,
    requestBody: { email: 'user@example.com', password: 'securepassword123' },
    mockResponse: {
      status: 200,
      body: { id: 1, email: 'user@example.com' },
    },
  },
  {
    method: 'POST',
    path: '/login',
    description: 'Login and get access token',
    requiresAuth: false,
    requestBody: { username: 'demo@habitual.dev', password: 'demo1234' },
    mockResponse: {
      status: 200,
      body: { access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...', token_type: 'bearer' },
    },
  },
  {
    method: 'POST',
    path: '/habits/',
    description: 'Create a new habit',
    requiresAuth: true,
    requestBody: { title: 'Morning workout', description: 'Exercise for 30 minutes', frequency: 'daily' },
    mockResponse: {
      status: 200,
      body: { id: 1, title: 'Morning workout', description: 'Exercise for 30 minutes', frequency: 'daily', user_id: 1 },
    },
  },
  {
    method: 'GET',
    path: '/habits/',
    description: 'List all habits',
    requiresAuth: true,
    mockResponse: {
      status: 200,
      body: [
        { id: 1, title: 'Morning workout', description: 'Exercise for 30 minutes', frequency: 'daily', user_id: 1 },
        { id: 2, title: 'Read 30 minutes', description: null, frequency: 'daily', user_id: 1 },
        { id: 3, title: 'Review pull requests', description: 'Check open PRs on GitHub', frequency: 'weekdays', user_id: 1 },
      ],
    },
  },
  {
    method: 'GET',
    path: '/habits/1',
    description: 'Get habit by ID',
    requiresAuth: true,
    mockResponse: {
      status: 200,
      body: { id: 1, title: 'Morning workout', description: 'Exercise for 30 minutes', frequency: 'daily', user_id: 1 },
    },
  },
  {
    method: 'PUT',
    path: '/habits/1',
    description: 'Update a habit',
    requiresAuth: true,
    requestBody: { title: 'Morning run', description: 'Run for 30 minutes', frequency: 'daily' },
    mockResponse: {
      status: 200,
      body: { id: 1, title: 'Morning run', description: 'Run for 30 minutes', frequency: 'daily', user_id: 1 },
    },
  },
  {
    method: 'DELETE',
    path: '/habits/1',
    description: 'Delete a habit',
    requiresAuth: true,
    mockResponse: {
      status: 200,
      body: { detail: 'Habit deleted' },
    },
  },
  {
    method: 'POST',
    path: '/habits/1/complete',
    description: 'Log a completion',
    requiresAuth: true,
    requestBody: { date_completed: '2026-02-28' },
    mockResponse: {
      status: 200,
      body: { id: 1, habit_id: 1, date_completed: '2026-02-28' },
    },
  },
  {
    method: 'GET',
    path: '/habits/1/streak',
    description: 'Get current streak',
    requiresAuth: true,
    mockResponse: {
      status: 200,
      body: { streak: 12 },
    },
  },
];
