
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface Category {
  id: number;
  name: string;
}

interface CategoryState {
  data: Category[];
  loading: boolean;
  error: string | null;
}

const API = "https://to-dos-api.softclub.tj/api/categories";

const initialState: CategoryState = {
  data: [],
  loading: false,
  error: null,
};


export const getCategories = createAsyncThunk(
  "categories/get",
  async () => {
    const res = await axios.get(API);
    return res.data.data;
  }
);


export const addCategory = createAsyncThunk(
  "categories/add",
  async (category: { name: string }) => {
    const res = await axios.post(API, category);
    return res.data;
  }
);


export const editCategory = createAsyncThunk(
  "categories/edit",
  async (data: { id: number; name: string }) => {
    const res = await axios.put(`${API}/${data.id}`, {
      name: data.name,
    });
    return res.data;
  }
);


export const deleteCategory = createAsyncThunk(
  "categories/delete",
  async (id: number) => {
    await axios.delete(`${API}/${id}`);
    return id;
  }
);

const categorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder

      .addCase(getCategories.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getCategories.rejected, (state) => {
        state.loading = false;
        state.error = "Error getting categories";
      })
         

      .addCase(addCategory.fulfilled, (state, action) => {
        state.data.push(action.payload);
      })

      
      .addCase(editCategory.fulfilled, (state, action) => {
        const index = state.data.findIndex(
          (item) => item.id === action.meta.arg.id
        );

        if (index !== -1) {
          state.data[index] = action.payload;
        }
      })

   
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.data = state.data.filter(
          (item) => item.id !== action.payload
        );
      });
  },
});

export default categorySlice.reducer;
