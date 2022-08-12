import { createSlice } from '@reduxjs/toolkit';

const reducerName = 'user';

const initialState = {
  isLoggedIn: false,
};

const store = createSlice({
  name: reducerName,
  initialState,
  reducers: {
    setUser: (state, { payload }) => {
      state = {
        ...state,
        ...payload,
        isLoggedIn: true,
      };
    },
  },
});

export default store.reducer;
export const actions = store.actions;
export const selectors = {
  getUser: (state) => state[reducerName] || {},
  getIsLoggedIn: (state) => state[reducerName]?.isLoggedIn || false,
};
