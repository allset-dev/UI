import { createSlice } from '@reduxjs/toolkit';

const reducerName = 'globalModal';

const initialState = {
  open: {
    login: false,
  },
};

const store = createSlice({
  name: reducerName,
  initialState,
  reducers: {
    setLoginOpen: (state) => {
      state.open.login = !state.open.login;
    },
  },
});

export default store.reducer;
export const actions = store.actions;
export const selectors = {
  getUser: (state) => state[reducerName] || {},
};
