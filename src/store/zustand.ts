
import { create } from "zustand";
import axios from "axios";
import type { Category, CategoryInput } from "../components/types";


interface CategoryStore {
  data: Category[];
  loading: boolean;
  error: string | null;

  getCategories: () => Promise<void>;
  addCategory: (category: CategoryInput) => Promise<void>;
  editCategory: (id: number, category: CategoryInput) => Promise<void>;
  deleteCategory: (id: number) => Promise<void>;
}

const API = "https://to-dos-api.softclub.tj/api/categories";

export const useCategoryStore = create<CategoryStore>((set, get) => ({
  data: [],
  loading: false,
  error: null,


  getCategories: async () => {
    try {
      set({ loading: true, error: null });

      const res = await axios.get(API);

      set({ data: res.data.data });
    } catch (error) {
      set({ error: "Error getting categories" });
      throw error;
    } finally {
      set({ loading: false });
    }
  },


  addCategory: async (category) => {
    try {
      set({ loading: true, error: null });

      await axios.post(API, category);

      await get().getCategories();
    } catch (error) {
      set({ error: "Error adding category" });
      throw error;
    } finally {
      set({ loading: false });
    }
  },


  editCategory: async (id, category) => {
    try {
      set({ loading: true, error: null });

      await axios.put(`${API}/${id}`, category);

      await get().getCategories();
    } catch (error) {
      set({ error: "Error editing category" });
      throw error;
    } finally {
      set({ loading: false });
    }
  },


  deleteCategory: async (id) => {
    try {
      set({ loading: true, error: null });

      await axios.delete(`${API}/${id}`);

      await get().getCategories();
    } catch (error) {
      set({ error: "Error deleting category" });
      throw error;
    } finally {
      set({ loading: false });
    }
  },
}));
