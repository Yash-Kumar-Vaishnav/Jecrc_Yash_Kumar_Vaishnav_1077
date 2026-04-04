import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 📦 Catalog API
export const catalogAPI = {
  getAll: () => api.get('/catalog'),
  getByType: (type) => api.get(`/catalog/type/${type}`),
  getById: (id) => api.get(`/catalog/${id}`),
  create: (item) => api.post('/catalog', item),
  update: (id, item) => api.put(`/catalog/${id}`, item),
  delete: (id) => api.delete(`/catalog/${id}`),
  search: (term) => api.get(`/catalog/search/${term}`),
};

// 🧾 Bill API
export const billAPI = {
  create: () => api.post('/bill/create'),
  getAll: () => api.get('/bill'),
  getById: (id) => api.get(`/bill/${id}`),
  getByDate: (date) => api.get(`/bill/date/${date}`),
  addItem: (billId, data) => api.post(`/bill/${billId}/items`, data),
  updateItem: (billId, itemId, data) => api.put(`/bill/${billId}/items/${itemId}`, data),
  removeItem: (billId, itemId) => api.delete(`/bill/${billId}/items/${itemId}`),
  applyDiscount: (billId, data) => api.post(`/bill/${billId}/discount`, data),
  setTax: (billId, data) => api.post(`/bill/${billId}/tax`, data),
  complete: (billId) => api.post(`/bill/${billId}/complete`),
  search: (invoiceNumber) => api.post(`/bill/search?invoiceNumber=${invoiceNumber}`),
};

// 📄 Invoice API (FIXED ✅)
export const invoiceAPI = {
  generatePdf: async (billId) => {
    const response = await api.get(`/invoice/${billId}/pdf`, {
      responseType: 'blob',
    });
    return response.data;
  },

  generateCsv: async (billId) => {
    const response = await api.get(`/invoice/${billId}/csv`, {
      responseType: 'blob',
    });
    return response.data;
  },
};

// 📊 Report API
export const reportAPI = {
  getDailySummary: (date) => api.get(`/report/daily/${date}`),
  getRange: (startDate, endDate) =>
    api.get(`/report/range`, { params: { startDate, endDate } }),
  getMonthlyRevenue: (month, year) =>
    api.get(`/report/monthly`, { params: { month, year } }),
};

export default api;