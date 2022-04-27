import React, { useState, useCallback, useEffect } from "react";
import { Box, Button, Card, Grid } from "@material-ui/core";
import { Link, useParams } from "react-router-dom";
import { Wrapper } from "../constants/Wrapper";
import StudentDetailsForm from "./StudentDetailsForm";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { fetchStudentDetails } from "../actions/homeworkActions";
import { getStudentDetails } from "../selectors/homeworkSelectors";
import capitalizeFirstLetter from "../utils/capitalizeFirstLetter";
import moment from "moment";

function StudentDetails({ handleFetchStudentDetails, studentDetails }) {
  const [editing, setEditing] = useState(false);

  let { id } = useParams();

  const handleEditing = useCallback(() => {
    setEditing(true);
  }, []);

  useEffect(() => {
    if (id) {
      handleFetchStudentDetails(id);
    }
  }, [handleFetchStudentDetails, id]);

  return (
    <Wrapper>
      {editing ? (
        <StudentDetailsForm isEditing />
      ) : (
        <Box p={4}>
          <Link to="/homework">
            <Button color="primary"> ← Go back</Button>
          </Link>
          <Box display="flex" alignItems="center" ml={1}>
            <Box mr={2}>Student details</Box>
          </Box>

          <Box py={2} ml={1}>
            <Card>
              <Grid item={true} container>
                <Grid item={true} xs={6}>
                  <Box p={2}>
                    First Name: {studentDetails?.firstName || "-"}
                  </Box>
                </Grid>
                <Grid item={true} xs={6}>
                  <Box p={2}>Last Name: {studentDetails?.lastName || "-"} </Box>
                </Grid>
              </Grid>
              <Grid item={true} container>
                <Grid item={true} xs={6}>
                  <Box p={2}> Id: {studentDetails?.id || "-"}</Box>
                </Grid>
                <Grid item={true} xs={6}>
                  <Box p={2}> Email: {studentDetails?.email || "-"} </Box>
                </Grid>
              </Grid>
              <Grid item={true} container>
                <Grid item={true} xs={6}>
                  <Box p={2}>
                    Gender:{" "}
                    {capitalizeFirstLetter(
                      studentDetails?.gender?.toLocaleLowerCase() || "-"
                    )}
                  </Box>
                </Grid>
                <Grid item={true} xs={6}>
                  <Box p={2}>
                    Favourite Subjects:{" "}
                    {String(studentDetails?.favouriteSubjects || "-")}
                  </Box>
                </Grid>
              </Grid>
              <Grid item={true} container>
                <Grid item={true} xs={6}>
                  <Box p={2}>
                    Total Time in books :{" "}
                    {studentDetails?.totalSpentInBooks || "-"}
                  </Box>
                </Grid>
                <Grid item={true} xs={6}>
                  <Box p={2}>
                    Created at:{" "}
                    {studentDetails?.created
                      ? moment(studentDetails?.created).format("DD MMM YYYY")
                      : "-"}
                  </Box>
                </Grid>
              </Grid>
              <Grid item={true} container>
                <Grid item={true} xs={6}>
                  <Box p={2} alignItems="flex-end">
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={handleEditing}
                    >
                      Edit
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </Card>
          </Box>
        </Box>
      )}
    </Wrapper>
  );
}

const mapStateToProps = (state) => ({
  studentDetails: getStudentDetails(state),
});

const mapDispatchToProps = {
  handleFetchStudentDetails: fetchStudentDetails,
};

StudentDetailsForm.propTypes = {
  handleFetchStudentDetails: PropTypes.func,
  studentDetails: PropTypes.object,
};

export default connect(mapStateToProps, mapDispatchToProps)(StudentDetails);
