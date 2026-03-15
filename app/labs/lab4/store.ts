import { configureStore } from "@reduxjs/toolkit";
import addReducer from "./redux/AddRedux/addReducer";
import counterReducer from "./redux/CounterRedux/counterReducer";
import helloReducer from "./redux/hello/helloReducer";
import todosReducer from "./redux/todos/todosReducer";

const store = configureStore({
  reducer: {
    helloReducer,
    counterReducer,
    addReducer,
    todosReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
