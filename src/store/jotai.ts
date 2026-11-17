
import axios from "axios";
import { atom } from "jotai";

interface Category {
  id: number;
  name: string;
}

const API = "https://to-dos-api.softclub.tj/api/categories";

export const categoriesAtom = atom<Category[]>([]);
export const loadingAtom = atom(false);
export const errorAtom = atom<string | null>(null);


export const getCategoriesAtom = atom(null, async (get, set) => {
  try {
    set(loadingAtom, true);
    set(errorAtom, null);

    const res = await axios.get(API);
    set(categoriesAtom, res.data.data);
  } catch (error) {
    set(errorAtom, "Error getting categories");
    console.log(error);
  } finally {
    set(loadingAtom, false);
  }
});


export const addCategoryAtom = atom(
  null,
  async (get, set, category: { name: string }) => {
    try {
      set(loadingAtom, true);
      set(errorAtom, null);

      await axios.post(API, category);
      await set(getCategoriesAtom);
    } catch (error) {
      set(errorAtom, "Error adding category");
      console.log(error);
    } finally {
      set(loadingAtom, false);
    }
  }
);


export const editCategoryAtom = atom(
  null,
  async (get, set, data: { id: number; name: string }) => {
    try {
      set(loadingAtom, true);
      set(errorAtom, null);

      await axios.put(`${API}/${data.id}`, {
        name: data.name,
      });

      await set(getCategoriesAtom);
    } catch (error) {
      set(errorAtom, "Error editing category");
      console.log(error);
    } finally {
      set(loadingAtom, false);
    }
  }
);


export const deleteCategoryAtom = atom(
  null,
  async (get, set, id: number) => {
    try {
      set(loadingAtom, true);
      set(errorAtom, null);

      await axios.delete(`${API}/${id}`);
      await set(getCategoriesAtom);
    } catch (error) {
      set(errorAtom, "Error deleting category");
      console.log(error);
    } finally {
      set(loadingAtom, false);
    }
  }
);
