import { configureStore } from '@reduxjs/toolkit';


import searchProductReducer from './searchProduct';


const store = configureStore({
  reducer: { searchProduct: searchProductReducer},
});

export default store;
