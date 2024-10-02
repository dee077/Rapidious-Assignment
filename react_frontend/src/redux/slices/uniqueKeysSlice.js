import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { DOMAIN } from '../../utils/constants';

// Async thunk for fetching unique keys
export const fetchUniqueKeys = createAsyncThunk(
  'uniqueKeys/fetchUniqueKeys',
  async (_, thunkAPI) => {
    try {
      const response = await fetch(`${DOMAIN}/api/unique_keys/`);
      if (!response.ok) {
        return thunkAPI.rejectWithValue('Failed to fetch unique keys');
      }
      const data = await response.json();
      return data?.unique_keys; 
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const uniqueKeysSlice = createSlice({
  name: 'uniqueKeys',
  initialState: {
    uniqueKeys: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    resetUniqueKeys: (state) => {
      state.uniqueKeys = []; 
      state.isLoading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUniqueKeys.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUniqueKeys.fulfilled, (state, action) => {
        state.isLoading = false;
        state.uniqueKeys = action.payload; // Update uniqueKeys with fetched data
      })
      .addCase(fetchUniqueKeys.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || action.error.message; // Set error message
      });
  },
});

export const { resetUniqueKeys } = uniqueKeysSlice.actions;

export default uniqueKeysSlice.reducer;
