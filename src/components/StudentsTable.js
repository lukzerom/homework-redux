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

function StudentsTable({ students, handleFilterStudents, filteredStudents }) {
  const [studentsData, setStudentsData] = useState(new Map());
  const [searchValue, setSearchValue] = useState("");

  const inputRef = useRef();

  useEffect(() => {
    if (filteredStudents.size > 0) {
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
      !studentsData.size > 0 ||
      !(searchValue.length !== 0 && filteredStudents.size === 0),
    [filteredStudents.size, searchValue.size, studentsData.size]
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
            studentsData.size > 0 &&
            studentsData.map((student) => (
              <TableRow key={student.get("id")}>
                <TableCell component="th" scope="row">
                  {student.get("lastName")}
                </TableCell>
                <TableCell align="right">
                  {student.get("firstName") || "-"}
                </TableCell>
                <TableCell align="right">
                  {capitalizeFirstLetter(
                    student?.get("gender")?.toLocaleLowerCase() || "-"
                  )}
                </TableCell>
                <TableCell align="right">
                  {moment(student.get("created")).format("DD MMM YYYY")}
                </TableCell>
                <TableCell align="right">
                  <Link to={`${window.location.pathname}/${student.get("id")}`}>
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
  students: PropTypes.object.isRequired,
  handleFilterStudents: PropTypes.func,
  filteredStudents: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(StudentsTable);
