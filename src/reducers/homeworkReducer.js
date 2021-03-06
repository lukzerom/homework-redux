import { fromJS } from "immutable";
import * as types from "../constants/actionTypes";

const initialState = fromJS({
  students: new Map(),
  filteredStudents: new Map(),
  studentDetails: {},
  notification: {},
});

export default function homeworkReducer(state = initialState, action) {
  switch (action.type) {
    case types.setStudents:
      return state.set("students", fromJS(action.value));
    case types.filterStudents:
      const filteredStudents = state
        .get("students")
        .filter((val) => val.get("lastName").includes(action.value));
      return state.set("filteredStudents", fromJS(filteredStudents));
    case types.setStudentDetails:
      return state.set("studentDetails", fromJS(action.value));
    case types.editStudentDetails:
      return state.set("studentDetails", fromJS(action.value));
    case types.setNotification:
      return state.set("notification", fromJS(action.value));
    case types.clearNotification:
      return state.set("notification", fromJS({}));

    default:
      return state;
  }
}
