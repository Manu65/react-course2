import { createSlice } from '@reduxjs/toolkit';

const initialSearchProducttate = { filter: ""};

const searchProductSlice = createSlice({
  name: 'searchFilter',
  initialState: initialSearchProducttate,
  reducers: {
    
    changeFilter(state, action) {
      state.filter =  action.payload;
    },
  },
});

export const searchProductActions = searchProductSlice.actions;

export default searchProductSlice.reducer;