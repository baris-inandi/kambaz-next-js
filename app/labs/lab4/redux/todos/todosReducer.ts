import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Todo {
  id: string;
  title: string;
}

interface TodosState {
  todos: Todo[];
  todo: Todo;
}

const initialState: TodosState = {
  todos: [
    { id: "1", title: "Learn React" },
    { id: "2", title: "Learn Node" },
  ],
  todo: { id: "-1", title: "Learn Mongo" },
};

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    setTodo: (state, action: PayloadAction<Todo>) => {
      state.todo = action.payload;
    },
    addTodo: (state) => {
      state.todos = [
        ...state.todos,
        { ...state.todo, id: Date.now().toString() },
      ];
      state.todo = { id: "-1", title: "" };
    },
    deleteTodo: (state, action: PayloadAction<string>) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
    updateTodo: (state) => {
      state.todos = state.todos.map((item) =>
        item.id === state.todo.id ? state.todo : item,
      );
      state.todo = { id: "-1", title: "" };
    },
  },
});

export const { setTodo, addTodo, deleteTodo, updateTodo } = todosSlice.actions;
export default todosSlice.reducer;
