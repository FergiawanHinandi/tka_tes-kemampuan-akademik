import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '1m', target: 100 },  // Ramp-up ke 100 users
    { duration: '3m', target: 500 },  // Stabil di 500 users
    { duration: '1m', target: 1000 }, // Peak load ke 1000 users
    { duration: '1m', target: 0 },    // Ramp-down
  ],
  thresholds: {
    http_req_duration: ['p(95)<500'], // 95% request harus di bawah 500ms
    http_req_failed: ['rate<0.01'],   // Error rate harus di bawah 1%
  },
};

const BASE_URL = __ENV.BASE_URL || 'http://localhost:3000/api';

export default function () {
  const payload = JSON.stringify({
    email: 'admin@tka-nasional.id',
    password: 'password123',
  });

  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const res = http.post(`${BASE_URL}/auth/login`, payload, params);

  check(res, {
    'status is 201': (r) => r.status === 201,
    'has access token': (r) => r.json().data.accessToken !== undefined,
  });

  sleep(1);
}
