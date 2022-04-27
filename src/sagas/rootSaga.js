import { all, takeEvery, takeLatest } from "redux-saga/effects";

import * as types from "../constants/actionTypes";
import fetchDemoAlbum from "./demo/fetchDemoAlbum";
import fetchStudentDetails from "./homework/fetchStudentDetails";
import fetchStudents from "./homework/fetchStudents";
import saveStudent from "./homework/saveStudent";

import updateStudentDetails from "./homework/updateStudentDetails";

export default function* rootSaga() {
  yield all([
    takeEvery(types.fetchDemoAlbum, fetchDemoAlbum),
    takeEvery(types.fetchStudents, fetchStudents),
    takeEvery(types.addStudent, saveStudent),
    takeEvery(types.fetchStudentDetails, fetchStudentDetails),
    takeEvery(types.editStudentDetails, updateStudentDetails),
  ]);
}
