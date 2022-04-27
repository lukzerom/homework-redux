import { call, put } from "redux-saga/effects";
import { setStudents } from "../../actions/homeworkActions";

import getStudents from "./utils/getStudents";

export default function* fetchStudents() {
  try {
    const students = yield call(getStudents);

    yield put(setStudents(students.data));
  } catch (e) {
    console.error("Shit happens", e);
  }
}
