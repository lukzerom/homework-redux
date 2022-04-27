import studentsAPI from "../../../api/studentsAPI";

export default function addStudent(data) {
  return studentsAPI.post("student", data);
}
