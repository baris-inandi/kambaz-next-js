import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Enrollment, enrollments as initialEnrollments } from "../database";

interface EnrollmentsState {
  enrollments: Enrollment[];
}

const initialState: EnrollmentsState = {
  enrollments: initialEnrollments,
};

const enrollmentsSlice = createSlice({
  name: "enrollments",
  initialState,
  reducers: {
    enroll: (state, action: PayloadAction<Enrollment>) => {
      const exists = state.enrollments.some(
        (enrollment) =>
          enrollment.user === action.payload.user &&
          enrollment.course === action.payload.course,
      );
      if (!exists) {
        state.enrollments.push(action.payload);
      }
    },
    unenroll: (
      state,
      action: PayloadAction<{ user: string; course: string }>,
    ) => {
      state.enrollments = state.enrollments.filter(
        (enrollment) =>
          !(
            enrollment.user === action.payload.user &&
            enrollment.course === action.payload.course
          ),
      );
    },
  },
});

export const { enroll, unenroll } = enrollmentsSlice.actions;
export default enrollmentsSlice.reducer;
