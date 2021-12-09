import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { fetchTodos } from './todoAPI';

export interface Todo {
  id: string;
  title: string;
  desc: string;
  user: string;
}

export interface TodoState {
  todos: Todo[],
  status: 'idle' | 'loading' | 'failed';
}

const initialState: TodoState = {
  todos: [],
  status: 'idle'
};

// Goes to backend to get todos and returns them
export const getTodos = createAsyncThunk(
  'todos/fetchTodos',
  async () => {
    const response = await fetchTodos();
    return response;
  }
);

export const todoSlice = createSlice({
  name: 'todos',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {},
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    builder
      .addCase(getTodos.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getTodos.fulfilled, (state, action) => {
        state.status = 'idle';
        state.todos = action.payload;
      });
  },
});

// export const {} = counterSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectTodos = (state: RootState) => state.todos;


export default todoSlice.reducer;