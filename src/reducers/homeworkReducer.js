import { fromJS } from "immutable";
import * as types from "../constants/actionTypes";

const initialState = fromJS({
  students: [],
  filteredStudents: [],
  studentDetails: {},
  notification: {},
});

export default function homeworkReducer(state = initialState, action) {
  switch (action.type) {
    case types.setStudents:
      return state.set("students", action.value);
    case types.filterStudents:
      const filteredStudents = state
        .get("students")
        .filter((val) => val.lastName.includes(action.value));
      return state.set("filteredStudents", filteredStudents);
    case types.setStudentDetails:
      return state.set("studentDetails", action.value);
    case types.editStudentDetails:
      return state.set("studentDetails", action.value);
    case types.setNotification:
      return state.set("notification", action.value);
    case types.clearNotification:
      return state.set("notification", {});

    default:
      return state;
  }
}
