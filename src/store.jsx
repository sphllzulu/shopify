import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import shoppingListReducer from './shoppingListSlice';


const store = configureStore({
  reducer: {
    user: userReducer,
    shoppingList: shoppingListReducer
  }
});

export default store;
