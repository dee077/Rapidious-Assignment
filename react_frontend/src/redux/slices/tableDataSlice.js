import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { DOMAIN } from '../../utils/constants';

export const fetchTableData = createAsyncThunk(
  'tableData/fetchTableData',
  async (pagination, thunkAPI) => {
    try {
      const response = await fetch(`${DOMAIN}/api/recipes_filter/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(pagination),
      });
      if (!response.ok) {
        return thunkAPI.rejectWithValue('Failed to fetch table data');
      }
      const data = await response.json();
      return data; 
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const tableDataSlice = createSlice({
  name: 'tableData',
  initialState: {
    tableData: [],
    pagination: {
      page: 1,
      size: 10,
      keywords: [],
    },
    isLoading: false,
    error: null,
  },
  reducers: {
    setPage: (state, action) => {
      state.pagination.page = action.payload; 
    },
    setSize: (state, action) => {
      state.pagination.size = action.payload; 
    },
    setKeywords: (state, action) => {
      state.pagination.keywords = action.payload; 
    },
    resetPagination: (state) => {
      state.pagination = {
        page: 1,
        size: 10,
        keywords: [],
      }; 
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTableData.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchTableData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.tableData = action.payload; 
      })
      .addCase(fetchTableData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || action.error.message; 
      });
  },
});

export const { setPage, setSize, setKeywords, resetPagination } = tableDataSlice.actions;

export default tableDataSlice.reducer;
