import { createSlice } from '@reduxjs/toolkit';
import tasksService from './services/tasks.js';
import generateService from './services/generate.js';

const taskSlice = createSlice({
  name: 'tasks',
  initialState: { task: null, generated: null },
  reducers: {
    setTaskState(state, action) {
      state.task = action.payload;
    },
    clearTaskState(state) {
      state.task = null;
    },
    setGenerated(state, action) {
      state.generated = action.payload;
    },
    clearGenerated(state) {
      state.generated = null;
    },
  },
});

export const { setTaskState, clearTaskState, setGenerated, clearGenerated } = taskSlice.actions;
  

export const createTask = (content) => {
  return async (dispatch) => {
    const created = await tasksService.create(content);
    dispatch(setTaskState(created));
  };
};

export const generateMaterials = (payload) => {
  return async (dispatch) => {
    const res = await generateService.generate(payload);
    dispatch(setGenerated(res));
  };
};

export default taskSlice.reducer;
