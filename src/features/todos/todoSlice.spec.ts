import todoReducer, {
  getTodos
 } from './todoSlice';
 import { configureStore } from '@reduxjs/toolkit';

describe('todo reducer', () => {
  let mockSuccessResponse= [ { "id": "1", "user": "Alex CW", "title": "Todo", "desc": "todo"}];
  beforeEach(() => {

    const mockJsonPromise = Promise.resolve(mockSuccessResponse);
    const mockFetchPromise = Promise.resolve({
        ok: true,
        json: () => mockJsonPromise,
    });
    var globalRef:any =global;
    globalRef.fetch = jest.fn().mockImplementation(() => mockFetchPromise);
  });

  it('should handle initial state', () => {

    expect(todoReducer(undefined, { type: 'unknown' })).toEqual({
      todos: [],
      status: 'idle',
    });
  });

  it('should handle initial state', () => {

    expect(todoReducer(undefined, { type: 'unknown' })).toEqual({
      todos: [],
      status: 'idle',
    });
  });

  it('gest data and updates store via thunk', async () => {
    const store = configureStore({
      reducer: function (state = 'q', action) {
        switch (action.type) {
          case 'todos/fetchTodos/fulfilled':
            return action.payload;
          default:
            return state;
        }
      },
    });
    await store.dispatch(getTodos());
    const state = store.getState();
    expect(state).toEqual(mockSuccessResponse);
});
});
