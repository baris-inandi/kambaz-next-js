import { configureStore } from "@reduxjs/toolkit";
import accountReducer from "./account/reducer";
import assignmentsReducer from "./assignments/reducer";
import coursesReducer from "./courses/reducer";
import enrollmentsReducer from "./enrollments/reducer";
import modulesReducer from "./modules/reducer";

export const store = configureStore({
  reducer: {
    accountReducer,
    assignmentsReducer,
    coursesReducer,
    enrollmentsReducer,
    modulesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
