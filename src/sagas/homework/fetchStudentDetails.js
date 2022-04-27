import { call, put } from "redux-saga/effects";
import { setStudentDetails } from "../../actions/homeworkActions";

import getStudentDetails from "./utils/getStudentDetails";

export default function* fetchStudentDetails(value) {
  try {
    const studentDetails = yield call(getStudentDetails, value.id);
    yield put(setStudentDetails(studentDetails.data));
  } catch (e) {
    console.error("Shit happens", e);
  }
}
