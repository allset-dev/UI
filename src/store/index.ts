import { configureStore } from '@reduxjs/toolkit';
import userStore from 'store/user';

export default configureStore({
  reducer: {
    userStore,
  },
});
