import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import PropTypes from "prop-types";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Link } from "react-router-dom";
import { Button, Input } from "@material-ui/core";
import {
  getFilteredStudents,
  getStudents,
} from "../selectors/homeworkSelectors";
import { connect } from "react-redux";
import { filterStudents } from "../actions/homeworkActions";
import capitalizeFirstLetter from "../utils/capitalizeFirstLetter";
import moment from "moment";

function StudentsTable({
  students = [],
  handleFilterStudents,
  filteredStudents = [],
}) {
  const [studentsData, setStudentsData] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  const inputRef = useRef();

  useEffect(() => {
    if (filteredStudents.length > 0) {
      setStudentsData(filteredStudents);
    } else {
      setStudentsData(students);
    }
  }, [filteredStudents, students]);

  const onFilter = useCallback(
    (e) => {
      setSearchValue(e.target.value);
      handleFilterStudents(e.target.value);
    },
    [handleFilterStudents]
  );

  const shouldDisplayData = useMemo(
    () =>
      !studentsData.length > 0 ||
      !(searchValue.length !== 0 && filteredStudents.length === 0),
    [filteredStudents.length, searchValue.length, studentsData.length]
  );

  return (
    <Paper>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <Input
                placeholder="Last name 🔎"
                onChange={onFilter}
                ref={inputRef}
              />
            </TableCell>

            <TableCell align="right">First Name</TableCell>
            <TableCell align="right">Gender</TableCell>
            <TableCell align="right">Created</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {shouldDisplayData ? (
            studentsData.length > 0 &&
            studentsData.map((student) => (
              <TableRow key={student.id}>
                <TableCell component="th" scope="row">
                  {student.lastName}
                </TableCell>
                <TableCell align="right">{student.firstName || "-"}</TableCell>
                <TableCell align="right">
                  {capitalizeFirstLetter(
                    student?.gender?.toLocaleLowerCase() || "-"
                  )}
                </TableCell>
                <TableCell align="right">
                  {moment(student.created).format("DD MMM YYYY")}
                </TableCell>
                <TableCell align="right">
                  <Link to={`${window.location.pathname}/${student.id}`}>
                    <Button variant="contained" color="primary">
                      Details
                    </Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>No data</TableRow>
          )}
        </TableBody>
      </Table>
    </Paper>
  );
}

const mapStateToProps = (state) => ({
  students: getStudents(state),
  filteredStudents: getFilteredStudents(state),
});

const mapDispatchToProps = {
  handleFilterStudents: filterStudents,
};

StudentsTable.propTypes = {
  students: PropTypes.array.isRequired,
  handleFilterStudents: PropTypes.func,
  filteredStudents: PropTypes.array.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(StudentsTable);
