import { configureStore } from '@reduxjs/toolkit';
import appReducer from '../features/appSlice';

export const store = configureStore({    //creating the store setup & adding the reducer
  reducer: {
    app: appReducer,
  },
});
