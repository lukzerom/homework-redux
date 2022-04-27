import { call, delay, put } from "redux-saga/effects";
import { setNotification, setStudents } from "../../actions/homeworkActions";
import { history } from "../../store";

import editStudentDetails from "./utils/editStudentDetails";
import getStudents from "./utils/getStudents";

export default function* updateStudentDetails(value) {
  try {
    yield call(editStudentDetails, value.id, value.data);
    yield put(
      setNotification({
        message: "Student updated! ",
        type: "success",
        timeout: 5000,
      })
    );
  } catch (e) {
    console.error("Shit happens", e);
  } finally {
    history.push("/homework");
  }
}
