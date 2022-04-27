import React, { useState, useCallback, useEffect } from "react";
import {
  Box,
  Button,
  Card,
  InputLabel,
  TextField,
  MenuItem,
  Select,
  ListItemText,
  OutlinedInput,
  Grid,
  Checkbox,
} from "@material-ui/core";
import { Link, useParams } from "react-router-dom";
import { Wrapper } from "../constants/Wrapper";
import { getStudentDetails } from "../selectors/homeworkSelectors";

import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addStudent, editStudentDetails } from "../actions/homeworkActions";
import { history } from "../store";

const subjects = [
  "Math",
  "Biology",
  "Chemistry",
  "Phisics",
  "Music",
  "Polish",
  "English",
  "Arts",
  "Sports",
];

const initialState = {
  email: "",
  firstName: "",
  lastName: "",
  gender: "MALE",
  favouriteSubjects: [],
  totalSpentInBooks: "",
};
function StudentDetailsForm({
  isEditing,
  studentDetails,
  handleAddStudent,
  handleEditStudentDetails,
}) {
  const [formData, setFormData] = useState(initialState);

  const { id } = useParams();

  useEffect(() => {
    if (isEditing && studentDetails) {
      setFormData({
        email: studentDetails.email || "",
        firstName: studentDetails.firstName || "",
        lastName: studentDetails.lastName || "",
        gender: studentDetails.gender || "MALE",
        favouriteSubjects: studentDetails.favouriteSubjects || [],
        totalSpentInBooks: studentDetails.totalSpentInBooks || "",
      });
    }
  }, [studentDetails, isEditing]);

  const handleChange = useCallback(
    (event) => {
      setFormData({ ...formData, [event.target.name]: event.target.value });
    },
    [formData]
  );

  const handleCancelClick = useCallback(() => {
    history.push("/homework");
  }, []);

  const handleFormSubmit = useCallback(() => {
    const {
      firstName,
      lastName,
      email,
      gender,
      totalSpentInBooks,
      favouriteSubjects,
    } = formData;

    if (isEditing) {
      handleEditStudentDetails(id, {
        firstName,
        lastName,
        email,
        gender,
        totalSpentInBooks: Number(totalSpentInBooks),
        favouriteSubjects,
      });
    } else {
      handleAddStudent({
        firstName,
        lastName,
        email,
        gender,
        totalSpentInBooks: Number(totalSpentInBooks),
        favouriteSubjects,
      });
    }
  }, [formData, handleAddStudent, handleEditStudentDetails, id, isEditing]);

  return (
    <Wrapper>
      <Box p={4}>
        <Link to="/homework">
          <Button color="primary"> ← Go back</Button>
        </Link>
        <Box display="flex" flexDirection="row" alignItems="center" ml={1}>
          <Box mr={2}> {isEditing ? "Student details" : "Add student"}</Box>
        </Box>

        <Box py={2} ml={1}>
          <Card>
            <Grid item={true} container>
              <Grid item={true} xs={6}>
                <Box p={2}>
                  <TextField
                    label="First name"
                    variant="outlined"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    fullWidth
                  />
                </Box>
              </Grid>
              <Grid item={true} xs={6}>
                <Box p={2}>
                  <TextField
                    label="Last name"
                    variant="outlined"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    fullWidth
                  />
                </Box>
              </Grid>
            </Grid>
            <Grid item={true} container>
              <Grid item={true} xs={6}>
                <Box p={2}>
                  <TextField
                    label="Email"
                    variant="outlined"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    fullWidth
                  />
                </Box>
              </Grid>

              <Grid item={true} xs={6}>
                <Box p={2}>
                  <TextField
                    label="Total time in books"
                    variant="outlined"
                    name="totalSpentInBooks"
                    onChange={handleChange}
                    fullWidth
                    type="number"
                    value={Number(formData.totalSpentInBooks)}
                  />
                </Box>
              </Grid>

              <Grid item={true} xs={6}>
                <Box p={2}>
                  {" "}
                  <InputLabel id="favorite-subjects-label">
                    Favorite Subjects
                  </InputLabel>
                  <Select
                    labelId="favorite-subjects-label"
                    name="favouriteSubjects"
                    multiple
                    fullWidth
                    value={formData.favouriteSubjects}
                    onChange={handleChange}
                    input={<OutlinedInput label="Tag" />}
                    renderValue={(selected) => selected.join(", ")}
                  >
                    {subjects.map((subject) => (
                      <MenuItem key={subject} value={subject}>
                        <Checkbox
                          checked={
                            formData.favouriteSubjects.indexOf(subject) > -1
                          }
                        />
                        <ListItemText primary={subject} />
                      </MenuItem>
                    ))}
                  </Select>
                </Box>
              </Grid>

              <Grid item={true} xs={6}>
                <Box p={2}>
                  <InputLabel id="gender-label">Gender</InputLabel>
                  <Select
                    placeholder="Gender"
                    id="demo-simple-select-helper"
                    labelId="gender-label"
                    variant="outlined"
                    name="gender"
                    value={formData.gender}
                    fullWidth
                    onChange={handleChange}
                  >
                    <MenuItem value={"MALE"}>Male</MenuItem>
                    <MenuItem value={"FEMALE"}>Female</MenuItem>
                  </Select>
                </Box>
              </Grid>
            </Grid>

            <Grid item={true} container>
              <Grid item={true} xs={12} container alignItems="flex-start">
                <Box p={2} alignItems="flex-end">
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={handleCancelClick}
                  >
                    Cancel
                  </Button>
                </Box>
                <Box p={2} alignItems="flex-end">
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={handleFormSubmit}
                  >
                    {isEditing ? "Save details" : "Add student"}
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Card>
        </Box>
      </Box>
    </Wrapper>
  );
}

const mapStateToProps = (state) => ({
  studentDetails: getStudentDetails(state),
});

const mapDispatchToProps = {
  handleAddStudent: addStudent,
  handleEditStudentDetails: editStudentDetails,
};

StudentDetailsForm.propTypes = {
  isEditing: PropTypes.bool,
  handleFetchStudentDetails: PropTypes.func,
  studentDetails: PropTypes.object,
  handleAddStudent: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(StudentDetailsForm);
