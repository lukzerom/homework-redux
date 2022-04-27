import { call, put } from "redux-saga/effects";
import { setNotification, setStudents } from "../../actions/homeworkActions";
import { history } from "../../store";
import addStudent from "./utils/addStudent";
import getStudents from "./utils/getStudents";

export default function* saveStudent(data) {
  try {
    yield call(addStudent, { ...data.value, address: null });
    yield put(
      setNotification({
        message: "Student Added! ",
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
