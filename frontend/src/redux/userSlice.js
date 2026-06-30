import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API = import.meta.env.VITE_API_URL || '/api';

export const fetchAllUsers = createAsyncThunk('user/fetchAll', async (token, { rejectWithValue }) => {
  try {
    const { data } = await axios.get(`${API}/auth/users`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || 'Failed to fetch users');
  }
});

export const updateUserRole = createAsyncThunk('user/updateRole', async ({ id, role, token }, { rejectWithValue }) => {
  try {
    const { data } = await axios.put(
      `${API}/auth/${id}/role`,
      { role },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || 'Failed to update user role');
  }
});

export const fetchMyOrders = createAsyncThunk('user/myOrders', async (token, { rejectWithValue }) => {
  try {
    const { data } = await axios.get(`${API}/orders/myorders`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || 'Failed to fetch orders');
  }
});

export const fetchAllOrders = createAsyncThunk('user/allOrders', async (token, { rejectWithValue }) => {
  try {
    const { data } = await axios.get(`${API}/orders/`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || 'Failed to fetch orders');
  }
});

export const updateOrderStatus = createAsyncThunk('user/updateOrderStatus', async ({ id, status, token }, { rejectWithValue }) => {
  try {
    const { data } = await axios.put(
      `${API}/orders/${id}/status`,
      { status },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || 'Failed to update status');
  }
});

export const placeOrder = createAsyncThunk('user/placeOrder', async ({ orderData, token }, { rejectWithValue }) => {
  try {
    const { data } = await axios.post(`${API}/orders/`, orderData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || 'Failed to place order');
  }
});

export const fetchAnalytics = createAsyncThunk('user/analytics', async (token, { rejectWithValue }) => {
  try {
    const { data } = await axios.get(`${API}/analytics/`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || 'Failed to fetch analytics');
  }
});

const userSlice = createSlice({
  name: 'user',
  initialState: {
    users: [],
    orders: [],
    allOrders: [],
    analytics: null,
    loading: false,
    error: null,
    orderSuccess: false,
    placedOrder: null,
  },
  reducers: {
    clearOrderSuccess(state) {
      state.orderSuccess = false;
      state.placedOrder = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // users
      .addCase(fetchAllUsers.pending, (state) => { state.loading = true; })
      .addCase(fetchAllUsers.fulfilled, (state, action) => { state.loading = false; state.users = action.payload; })
      .addCase(fetchAllUsers.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
      // update user role
      .addCase(updateUserRole.fulfilled, (state, action) => {
        const updated = action.payload;
        const idx = state.users.findIndex(u => u._id === updated._id);
        if (idx !== -1) state.users[idx] = updated;
      })
      // my orders
      .addCase(fetchMyOrders.pending, (state) => { state.loading = true; })
      .addCase(fetchMyOrders.fulfilled, (state, action) => { state.loading = false; state.orders = action.payload; })
      .addCase(fetchMyOrders.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
      // all orders
      .addCase(fetchAllOrders.pending, (state) => { state.loading = true; })
      .addCase(fetchAllOrders.fulfilled, (state, action) => { state.loading = false; state.allOrders = action.payload; })
      .addCase(fetchAllOrders.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
      // update order status
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        const updated = action.payload.order;
        const idx = state.allOrders.findIndex(o => o._id === updated._id);
        if (idx !== -1) state.allOrders[idx] = updated;
      })
      // place order
      .addCase(placeOrder.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(placeOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.orderSuccess = true;
        state.placedOrder = action.payload;
      })
      .addCase(placeOrder.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
      // analytics
      .addCase(fetchAnalytics.pending, (state) => { state.loading = true; })
      .addCase(fetchAnalytics.fulfilled, (state, action) => { state.loading = false; state.analytics = action.payload; })
      .addCase(fetchAnalytics.rejected, (state, action) => { state.loading = false; state.error = action.payload; });
  },
});

export const { clearOrderSuccess } = userSlice.actions;
export default userSlice.reducer;
