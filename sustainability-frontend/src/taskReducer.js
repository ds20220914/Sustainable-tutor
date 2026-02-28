import { createSlice } from '@reduxjs/toolkit';

const taskSlice = createSlice({
  name: 'tasks',
  initialState: { task: null },
  reducers: {
    setTaskState(state, action) {
      state.task = action.payload;
    },
    clearTaskState(state) {
      state.task = null;
    },
  },
});

export const { setTaskState, clearTaskState } = taskSlice.actions;
  

export const createTask = (content) => {
  return async (dispatch) => {
    dispatch(setTaskState(content));
  };
};

export default taskSlice.reducer;