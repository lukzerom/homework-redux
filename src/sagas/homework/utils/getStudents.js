import studentsAPI from "../../../api/studentsAPI";

export default function getStudents() {
  return studentsAPI.get("students");
}
