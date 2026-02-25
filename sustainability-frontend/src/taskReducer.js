import { createSlice } from '@reduxjs/toolkit';

const taskSlice = createSlice({
  name: 'tasks',
  initialState: { task: null },
  reducers: {
    setTaskState(state, action) {
      state.notification = action.payload;
    },
    clearTaskState(state) {
      state.task = null;
    },
  },
});

export const { setTaskState, clearTaskState } = taskSlice.actions;
  

export const setTask = (content) => {
  return async (dispatch) => {
    dispatch(setTaskState(content));
    await new Promise((resolve) => setTimeout(resolve, 5000));
    dispatch(clearTaskState());
  };
};

export default taskSlice.reducer;