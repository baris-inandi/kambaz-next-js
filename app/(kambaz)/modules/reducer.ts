import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Module, modules as initialModules } from "../database";

interface ModulesState {
  modules: Module[];
}

const initialState: ModulesState = {
  modules: initialModules,
};

const modulesSlice = createSlice({
  name: "modules",
  initialState,
  reducers: {
    addModule: (state, action: PayloadAction<Module>) => {
      state.modules.push(action.payload);
    },
    deleteModule: (state, action: PayloadAction<string>) => {
      state.modules = state.modules.filter(
        (module) => module._id !== action.payload,
      );
    },
    updateModule: (state, action: PayloadAction<Module>) => {
      state.modules = state.modules.map((module) =>
        module._id === action.payload._id
          ? { ...action.payload, editing: false }
          : { ...module, editing: false },
      );
    },
    editModule: (state, action: PayloadAction<string>) => {
      state.modules = state.modules.map((module) => ({
        ...module,
        editing: module._id === action.payload,
      }));
    },
  },
});

export const { addModule, deleteModule, updateModule, editModule } =
  modulesSlice.actions;
export default modulesSlice.reducer;
