import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API = `${import.meta.env.VITE_API_URL || '/_/backend/api'}/products`;

export const fetchProducts = createAsyncThunk('products/fetchAll', async (_, { rejectWithValue }) => {
  try {
    const { data } = await axios.get(`${API}/`);
    return data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || 'Failed to fetch products');
  }
});

export const fetchProductById = createAsyncThunk('products/fetchById', async (id, { rejectWithValue }) => {
  try {
    const { data } = await axios.get(`${API}/${id}`);
    return data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || 'Failed to fetch product');
  }
});

export const createProduct = createAsyncThunk('products/create', async ({ formData, token }, { rejectWithValue }) => {
  try {
    const { data } = await axios.post(`${API}/`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    });
    return data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || 'Failed to create product');
  }
});

export const updateProduct = createAsyncThunk('products/update', async ({ id, formData, token }, { rejectWithValue }) => {
  try {
    const { data } = await axios.put(`${API}/${id}`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    });
    return data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || 'Failed to update product');
  }
});

export const deleteProduct = createAsyncThunk('products/delete', async ({ id, token }, { rejectWithValue }) => {
  try {
    await axios.delete(`${API}/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return id;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || 'Failed to delete product');
  }
});

const productSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],
    product: null,
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    clearProductState(state) {
      state.error = null;
      state.success = false;
      state.product = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchAll
      .addCase(fetchProducts.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchProducts.fulfilled, (state, action) => { state.loading = false; state.products = action.payload; })
      .addCase(fetchProducts.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
      // fetchById
      .addCase(fetchProductById.pending, (state) => { state.loading = true; state.error = null; state.product = null; })
      .addCase(fetchProductById.fulfilled, (state, action) => { state.loading = false; state.product = action.payload; })
      .addCase(fetchProductById.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
      // create
      .addCase(createProduct.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(createProduct.fulfilled, (state, action) => { state.loading = false; state.success = true; state.products.push(action.payload); })
      .addCase(createProduct.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
      // update
      .addCase(updateProduct.pending, (state) => { state.loading = true; })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        const idx = state.products.findIndex(p => p._id === action.payload._id);
        if (idx !== -1) state.products[idx] = action.payload;
      })
      .addCase(updateProduct.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
      // delete
      .addCase(deleteProduct.pending, (state) => { state.loading = true; })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products = state.products.filter(p => p._id !== action.payload);
      })
      .addCase(deleteProduct.rejected, (state, action) => { state.loading = false; state.error = action.payload; });
  },
});

export const { clearProductState } = productSlice.actions;
export default productSlice.reducer;
