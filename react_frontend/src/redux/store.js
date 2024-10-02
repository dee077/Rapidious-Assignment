import { configureStore } from '@reduxjs/toolkit';
import tableDataReducer from './slices/tableDataSlice'
import uniqueKeysReducer from './slices/uniqueKeysSlice'

const store = configureStore({
  reducer: {
    uniqueKeys: uniqueKeysReducer,
    tableData: tableDataReducer,
  },
});

export default store;
