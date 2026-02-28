export interface Endpoint {
  method: string;
  path: string;
  description: string;
  requestBody?: unknown;
  response: {
    status: number;
    body: unknown;
  };
}

export const endpoints: Endpoint[] = [
  {
    method: 'POST',
    path: '/register',
    description: 'Register a new user',
    requestBody: { email: 'user@example.com', password: 'securepassword123' },
    response: {
      status: 200,
      body: { id: 1, email: 'user@example.com' },
    },
  },
  {
    method: 'POST',
    path: '/login',
    description: 'Login and get access token',
    requestBody: { username: 'user@example.com', password: 'securepassword123' },
    response: {
      status: 200,
      body: { access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...', token_type: 'bearer' },
    },
  },
  {
    method: 'POST',
    path: '/habits/',
    description: 'Create a new habit',
    requestBody: { title: 'Morning workout', description: 'Exercise for 30 minutes', frequency: 'daily' },
    response: {
      status: 200,
      body: { id: 1, title: 'Morning workout', description: 'Exercise for 30 minutes', frequency: 'daily', user_id: 1 },
    },
  },
  {
    method: 'GET',
    path: '/habits/',
    description: 'List all habits',
    response: {
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
    response: {
      status: 200,
      body: { id: 1, title: 'Morning workout', description: 'Exercise for 30 minutes', frequency: 'daily', user_id: 1 },
    },
  },
  {
    method: 'PUT',
    path: '/habits/1',
    description: 'Update a habit',
    requestBody: { title: 'Morning run', description: 'Run for 30 minutes', frequency: 'daily' },
    response: {
      status: 200,
      body: { id: 1, title: 'Morning run', description: 'Run for 30 minutes', frequency: 'daily', user_id: 1 },
    },
  },
  {
    method: 'DELETE',
    path: '/habits/1',
    description: 'Delete a habit',
    response: {
      status: 200,
      body: { detail: 'Habit deleted' },
    },
  },
  {
    method: 'POST',
    path: '/habits/1/complete',
    description: 'Log a completion',
    requestBody: { date_completed: '2026-02-28' },
    response: {
      status: 200,
      body: { id: 1, habit_id: 1, date_completed: '2026-02-28' },
    },
  },
  {
    method: 'GET',
    path: '/habits/1/streak',
    description: 'Get current streak',
    response: {
      status: 200,
      body: { streak: 12 },
    },
  },
];
