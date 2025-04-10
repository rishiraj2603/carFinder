import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface WishlistState {
  items: number[];
}

// Load initial state from localStorage
const loadState = (): WishlistState => {
  try {
    const serializedState = localStorage.getItem('wishlist');
    if (serializedState === null) {
      return { items: [] };
    }
    return { items: JSON.parse(serializedState) };
  } catch (err) {
    return { items: [] };
  }
};

const initialState: WishlistState = loadState();

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    addToWishlist: (state, action: PayloadAction<number>) => {
      if (!state.items.includes(action.payload)) {
        state.items.push(action.payload);
        localStorage.setItem('wishlist', JSON.stringify(state.items));
      }
    },
    removeFromWishlist: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(id => id !== action.payload);
      localStorage.setItem('wishlist', JSON.stringify(state.items));
    },
    clearWishlist: (state) => {
      state.items = [];
      localStorage.removeItem('wishlist');
    }
  }
});

export const { addToWishlist, removeFromWishlist, clearWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer; 