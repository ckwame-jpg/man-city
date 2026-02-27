export interface Endpoint {
  method: string;
  path: string;
  description: string;
  response: {
    status: number;
    body: unknown;
  };
}

export const endpoints: Endpoint[] = [
  {
    method: 'GET',
    path: '/health',
    description: 'Health check',
    response: {
      status: 200,
      body: { status: 'ok', uptime: '14d 3h 22m', version: '1.0.0' },
    },
  },
  {
    method: 'GET',
    path: '/habits',
    description: 'List all habits',
    response: {
      status: 200,
      body: [
        { id: 1, name: 'Morning workout', streak: 12, frequency: 'daily', last_completed: '2026-02-27' },
        { id: 2, name: 'Read 30 minutes', streak: 5, frequency: 'daily', last_completed: '2026-02-27' },
        { id: 3, name: 'Review pull requests', streak: 3, frequency: 'weekdays', last_completed: '2026-02-26' },
      ],
    },
  },
  {
    method: 'GET',
    path: '/habits/1',
    description: 'Get habit by ID',
    response: {
      status: 200,
      body: {
        id: 1,
        name: 'Morning workout',
        streak: 12,
        frequency: 'daily',
        created_at: '2026-02-15T08:00:00Z',
        last_completed: '2026-02-27T07:30:00Z',
        completions_this_week: 5,
        longest_streak: 21,
      },
    },
  },
  {
    method: 'GET',
    path: '/docs',
    description: 'API documentation',
    response: {
      status: 200,
      body: {
        message: 'Full API documentation available at the GitHub repository.',
        repo: 'https://github.com/ckwame-jpg/habit-tracker-api',
        endpoints: ['GET /health', 'GET /habits', 'GET /habits/:id', 'POST /habits', 'PUT /habits/:id', 'DELETE /habits/:id'],
      },
    },
  },
];
