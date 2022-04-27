import * as types from "../constants/actionTypes";

export const setStudents = (value) => {
  return {
    type: types.setStudents,
    value,
  };
};

export const fetchStudents = (value) => {
  return {
    type: types.fetchStudents,
    value,
  };
};

export const addStudent = (value) => ({
  type: types.addStudent,
  value,
});

export const fetchStudentDetails = (value) => ({
  type: types.fetchStudentDetails,
  id: value,
});

export const setStudentDetails = (value) => ({
  type: types.setStudentDetails,
  value,
});

export const editStudentDetails = (id, data) => ({
  type: types.editStudentDetails,
  id,
  data,
});

export const filterStudents = (value) => ({
  type: types.filterStudents,
  value,
});

export const setNotification = (value) => ({
  type: types.setNotification,
  value,
});

export const clearNotification = () => ({
  type: types.clearNotification,
});
