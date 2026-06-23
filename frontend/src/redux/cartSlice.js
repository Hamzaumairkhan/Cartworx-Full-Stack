import { createSlice } from '@reduxjs/toolkit';

const cartFromStorage = localStorage.getItem('cartworx_cart')
  ? JSON.parse(localStorage.getItem('cartworx_cart'))
  : [];

const saveCart = (items) => {
  localStorage.setItem('cartworx_cart', JSON.stringify(items));
};

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: cartFromStorage,
  },
  reducers: {
    addToCart(state, action) {
      const product = action.payload;
      const existing = state.items.find((i) => i._id === product._id);
      if (existing) {
        existing.quantity = Math.min(existing.quantity + 1, product.stock || 99);
      } else {
        state.items.push({ ...product, quantity: 1 });
      }
      saveCart(state.items);
    },
    removeFromCart(state, action) {
      state.items = state.items.filter((i) => i._id !== action.payload);
      saveCart(state.items);
    },
    increaseQty(state, action) {
      const item = state.items.find((i) => i._id === action.payload);
      if (item) {
        item.quantity = Math.min(item.quantity + 1, item.stock || 99);
      }
      saveCart(state.items);
    },
    decreaseQty(state, action) {
      const item = state.items.find((i) => i._id === action.payload);
      if (item) {
        if (item.quantity > 1) {
          item.quantity -= 1;
        } else {
          state.items = state.items.filter((i) => i._id !== action.payload);
        }
      }
      saveCart(state.items);
    },
    clearCart(state) {
      state.items = [];
      saveCart([]);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase('products/fetchAll/fulfilled', (state, action) => {
        const validProducts = action.payload;
        if (validProducts && Array.isArray(validProducts)) {
          const originalCount = state.items.length;
          state.items = state.items.filter(item => 
            validProducts.some(p => p._id === item._id)
          );
          if (state.items.length !== originalCount) {
            saveCart(state.items);
          }
        }
      })
      .addCase('products/delete/fulfilled', (state, action) => {
        const deletedId = action.payload;
        const originalCount = state.items.length;
        state.items = state.items.filter(i => i._id !== deletedId);
        if (state.items.length !== originalCount) {
          saveCart(state.items);
        }
      });
  }
});

export const { addToCart, removeFromCart, increaseQty, decreaseQty, clearCart } = cartSlice.actions;

// Selectors
export const selectCartItems = (state) => state.cart.items;
export const selectCartCount = (state) =>
  state.cart.items.reduce((acc, i) => acc + i.quantity, 0);
export const selectCartTotal = (state) =>
  state.cart.items.reduce((acc, i) => acc + i.price * i.quantity, 0);

export default cartSlice.reducer;
