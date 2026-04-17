import { create } from "zustand";

interface Todo {
  id: string;
  title: string;
}

interface TodoState {
  todos: Todo[];
  todo: Todo;
  setTodo: (todo: Todo) => void;
  addTodo: () => void;
  updateTodo: () => void;
  deleteTodo: (id: string) => void;
}

const useTodoStore = create<TodoState>((set) => ({
  todos: [
    { id: "1", title: "Learn Zustand" },
    { id: "2", title: "Keep state small" },
  ],
  todo: { id: "-1", title: "Ship the lab" },
  setTodo: (todo) => set({ todo }),
  addTodo: () =>
    set((state) => ({
      todos: [...state.todos, { ...state.todo, id: Date.now().toString() }],
      todo: { id: "-1", title: "" },
    })),
  updateTodo: () =>
    set((state) => ({
      todos: state.todos.map((item) =>
        item.id === state.todo.id ? state.todo : item,
      ),
      todo: { id: "-1", title: "" },
    })),
  deleteTodo: (id) =>
    set((state) => ({
      todos: state.todos.filter((item) => item.id !== id),
    })),
}));

export default useTodoStore;
