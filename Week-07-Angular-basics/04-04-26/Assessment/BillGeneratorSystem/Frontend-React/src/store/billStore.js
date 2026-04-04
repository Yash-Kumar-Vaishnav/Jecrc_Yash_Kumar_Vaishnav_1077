import create from 'zustand';
import { billAPI, catalogAPI } from '../services/api';

export const useBillStore = create((set, get) => ({
  bills: [],
  currentBill: null,
  catalogs: {
    entrance: [],
    donation: [],
    product: [],
  },
  loading: false,
  error: null,

  // Bill operations
  createBill: async () => {
    set({ loading: true, error: null });
    try {
      const { data } = await billAPI.create();
      set({ currentBill: data });
      return data;
    } catch (error) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },

  getBill: async (id) => {
    set({ loading: true });
    try {
      const { data } = await billAPI.getById(id);
      set({ currentBill: data });
      return data;
    } catch (error) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },

  getAllBills: async () => {
    set({ loading: true });
    try {
      const { data } = await billAPI.getAll();
      set({ bills: data });
      return data;
    } catch (error) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },

  addItem: async (billId, catalogItemId, quantity, unitPrice) => {
    try {
      const { data } = await billAPI.addItem(billId, {
        catalogItemId,
        quantity,
        unitPrice,
      });
      set({ currentBill: data });
      return data;
    } catch (error) {
      set({ error: error.message });
    }
  },

  updateItem: async (billId, itemId, quantity, unitPrice) => {
    try {
      const { data } = await billAPI.updateItem(billId, itemId, {
        quantity,
        unitPrice,
      });
      set({ currentBill: data });
      return data;
    } catch (error) {
      set({ error: error.message });
    }
  },

  removeItem: async (billId, itemId) => {
    try {
      const { data } = await billAPI.removeItem(billId, itemId);
      set({ currentBill: data });
      return data;
    } catch (error) {
      set({ error: error.message });
    }
  },

  applyDiscount: async (billId, discountAmount, discountPercentage) => {
    try {
      const { data } = await billAPI.applyDiscount(billId, {
        discountAmount,
        discountPercentage,
      });
      set({ currentBill: data });
      return data;
    } catch (error) {
      set({ error: error.message });
    }
  },

  setTax: async (billId, taxPercentage) => {
    try {
      const { data } = await billAPI.setTax(billId, { taxPercentage });
      set({ currentBill: data });
      return data;
    } catch (error) {
      set({ error: error.message });
    }
  },

  completeBill: async (billId) => {
    try {
      const { data } = await billAPI.complete(billId);
      set({ currentBill: data });
      await get().getAllBills();
      return data;
    } catch (error) {
      set({ error: error.message });
    }
  },

  // Catalog operations
  loadCatalogs: async () => {
    set({ loading: true });
    try {
      const types = ['entrance', 'donation', 'product'];
      const catalogs = {};

      for (const type of types) {
        const { data } = await catalogAPI.getByType(type);
        catalogs[type] = data;
      }

      set({ catalogs });
      return catalogs;
    } catch (error) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },

  addCatalogItem: async (item) => {
    try {
      const { data } = await catalogAPI.create(item);
      const catalogs = get().catalogs;
      catalogs[item.catalogType] = [...(catalogs[item.catalogType] || []), data];
      set({ catalogs });
      return data;
    } catch (error) {
      set({ error: error.message });
    }
  },

  updateCatalogItem: async (id, item) => {
    try {
      const { data } = await catalogAPI.update(id, item);
      await get().loadCatalogs();
      return data;
    } catch (error) {
      set({ error: error.message });
    }
  },

  clearError: () => set({ error: null }),
}));
