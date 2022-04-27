import studentsAPI from "../../../api/studentsAPI";

export default function getStudentDetails(id) {
  return studentsAPI.get(`students/${id}`);
}
