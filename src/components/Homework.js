import React, { useEffect } from "react";
import { Box, Button } from "@material-ui/core";
import { connect } from "react-redux";
import { fetchStudents } from "../actions/homeworkActions";
import StudentsTable from "./StudentsTable";
import { Wrapper } from "../constants/Wrapper";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

function Homework({ handleFetchStudents }) {
  useEffect(() => {
    handleFetchStudents();
  }, [handleFetchStudents]);

  return (
    <Wrapper>
      <Box p={4}>
        <Box display="flex" alignItems="center" ml={1}>
          <Box mr={2}>Students list</Box>{" "}
          <Link to="/add_student">
            <Button variant="contained" color="primary">
              Add student
            </Button>
          </Link>
        </Box>

        <Box py={2} ml={1}>
          <StudentsTable />
        </Box>
      </Box>
    </Wrapper>
  );
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {
  handleFetchStudents: fetchStudents,
};

Homework.propTypes = {
  handleFetchStudents: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(Homework);
