import studentsAPI from "../../../api/studentsAPI";

export default function editStudentDetails(id, data) {
  return studentsAPI.patch(`student/${id}`, data);
}
