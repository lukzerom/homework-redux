import { createSelector } from "reselect";

export const getHomeworkState = (state) => state.get("homework");

export const getStudents = createSelector(getHomeworkState, (studentState) =>
  studentState.get("students")
);

export const getStudentDetails = createSelector(
  getHomeworkState,
  (studentState) => studentState.get("studentDetails")
);

export const getFilteredStudents = createSelector(
  getHomeworkState,
  (studentState) => studentState.get("filteredStudents")
);

export const getNotification = createSelector(
  getHomeworkState,
  (studentState) => studentState.get("notification")
);
