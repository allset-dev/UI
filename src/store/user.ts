import { createSlice } from '@reduxjs/toolkit';

const reducerName = 'user';

const initialState = {
  isLoggedIn: false as boolean,
} as const;

interface State {
  [reducerName]: typeof initialState;
}

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
  getUser: (state: State) => state[reducerName] || {},
  getIsLoggedIn: (state: State) => state[reducerName]?.isLoggedIn || false,
};
