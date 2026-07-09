import axios from 'axios';

// In development the Vite proxy forwards /equipe → http://localhost:4000
// For a production build, set VITE_API_BASE in your .env file.
const BASE_URL = import.meta.env.VITE_API_BASE ?? '';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor for global error logging
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('[API Error]', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export const equipeService = {
  /**
   * GET /equipe — fetch all teams
   */
  getAll: async () => {
    const { data } = await api.get('/equipe');
    return data;
  },

  /**
   * GET /equipe/:id — fetch a single team
   */
  getById: async (id) => {
    const { data } = await api.get(`/equipe/${id}`);
    return data;
  },

  /**
   * POST /equipe — create a new team
   */
  create: async (payload) => {
    const { data } = await api.post('/equipe', payload);
    return data;
  },

  /**
   * PUT /equipe/:id — update an existing team
   */
  update: async (id, payload) => {
    const { data } = await api.put(`/equipe/${id}`, payload);
    return data;
  },

  /**
   * DELETE /equipe/:id — delete a team
   */
  remove: async (id) => {
    const { data } = await api.delete(`/equipe/${id}`);
    return data;
  },
};
