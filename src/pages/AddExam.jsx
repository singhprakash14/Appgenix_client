import React, { useState, useEffect } from "react";
import {
  Button,
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  CircularProgress,
  Alert,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Checkbox,
  ListItemText,
  TextField,
} from "@mui/material";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { useDispatch, useSelector } from "react-redux";
import { createExam } from "../redux/slices/examSlice";
import { fetchAllQuestions } from "../redux/slices/questionSlice";
import { useNavigate } from "react-router-dom";

const AddExam = () => {
  const [formData, setFormData] = useState({
    title: "",
    startTime: null,
    endTime: null,
    totalMarks: "",
    questions: [],
  });
  const [formErrors, setFormErrors] = useState({});

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { questions } = useSelector(
    (state) => state.question || { questions: [] }
  );
  const { status, error } = useSelector(
    (state) => state.exam || { status: "idle", error: null }
  );
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    dispatch(fetchAllQuestions());
  }, [dispatch]);

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleQuestionSelect = (e) => {
    setFormData({ ...formData, questions: e.target.value });
  };

  const validateForm = () => {
    let errors = {};
    if (!formData.title.trim()) errors.title = "Title is required!";
    if (!formData.startTime) errors.startTime = "Start time is required!";
    if (!formData.endTime) errors.endTime = "End time is required!";
    if (new Date(formData.endTime) <= new Date(formData.startTime))
      errors.endTime = "End time must be after the start time!";
    if (!formData.totalMarks) errors.totalMarks = "Total marks are required!";
    if (formData.questions.length === 0)
      errors.questions = "Please select at least one question!";
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const action = await dispatch(createExam(formData));
      if (createExam.fulfilled.match(action)) {
        setSuccessMessage("🎉 Exam created successfully!");
        setTimeout(() => navigate("/"), 2000);
      }
    } catch (error) {
      console.error("Error creating exam:", error);
    }
  };

  return (
    <Container
      maxWidth="md"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Card
        sx={{
          boxShadow: 6,
          padding: 4,
          borderRadius: 5,
          border: "2px solid #e0e0e0",
          backgroundColor: "#f5f5f5",
        }}
      >
        <CardContent>
          <Typography variant="h4" textAlign="center" fontWeight="bold" mb={2}>
            📚 Create New Exam
          </Typography>
          <Typography
            variant="subtitle1"
            textAlign="center"
            color="textSecondary"
            mb={3}
          >
            Fill the details carefully before creating the exam.
          </Typography>

          {successMessage && (
            <Alert severity="success" sx={{ mb: 2 }}>
              {successMessage}
            </Alert>
          )}
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  label="Exam Title"
                  name="title"
                  value={formData.title}
                  onChange={(e) => handleChange("title", e.target.value)}
                  error={!!formErrors.title}
                  helperText={formErrors.title}
                  fullWidth
                  required
                />
              </Grid>

              {/* ✅ Updated Start Time with react-datepicker */}
              <Grid item xs={6}>
                <DatePicker
                  selected={formData.startTime}
                  onChange={(date) => handleChange("startTime", date)}
                  showTimeSelect
                  dateFormat="Pp"
                  placeholderText="Select Start Time"
                  customInput={
                    <TextField
                      label="Start Time"
                      error={!!formErrors.startTime}
                      helperText={formErrors.startTime}
                      fullWidth
                    />
                  }
                />
              </Grid>

              {/* ✅ Updated End Time with react-datepicker */}
              <Grid item xs={6}>
                <DatePicker
                  selected={formData.endTime}
                  onChange={(date) => handleChange("endTime", date)}
                  showTimeSelect
                  dateFormat="Pp"
                  placeholderText="Select End Time"
                  customInput={
                    <TextField
                      label="End Time"
                      error={!!formErrors.endTime}
                      helperText={formErrors.endTime}
                      fullWidth
                    />
                  }
                />
              </Grid>

              {/* Total Marks */}
              <Grid item xs={12}>
                <TextField
                  label="Total Marks"
                  name="totalMarks"
                  type="number"
                  value={formData.totalMarks}
                  onChange={(e) => handleChange("totalMarks", e.target.value)}
                  error={!!formErrors.totalMarks}
                  helperText={formErrors.totalMarks}
                  fullWidth
                  required
                />
              </Grid>

              {/* Multiple Question Selection */}
              <Grid item xs={12}>
                <FormControl fullWidth error={!!formErrors.questions}>
                  <InputLabel>Select Questions</InputLabel>
                  <Select
                    multiple
                    value={formData.questions}
                    onChange={handleQuestionSelect}
                    renderValue={(selected) =>
                      selected
                        .map((id) => questions.find((q) => q._id === id)?.title)
                        .join(", ")
                    }
                  >
                    {questions.map((question) => (
                      <MenuItem key={question._id} value={question._id}>
                        <Checkbox
                          checked={formData.questions.includes(question._id)}
                        />
                        <ListItemText primary={question.title} />
                      </MenuItem>
                    ))}
                  </Select>
                  {formErrors.questions && (
                    <Typography color="error" variant="caption">
                      {formErrors.questions}
                    </Typography>
                  )}
                </FormControl>
              </Grid>

              {/* Submit Button */}
              <Grid item xs={12} textAlign="center">
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  disabled={status === "loading"}
                  sx={{
                    backgroundColor: "#1976d2",
                    color: "white",
                    borderRadius: 3,
                    padding: "12px 25px",
                    "&:hover": { backgroundColor: "#1565c0" },
                  }}
                >
                  {status === "loading" ? (
                    <CircularProgress size={24} sx={{ color: "white" }} />
                  ) : (
                    "Create Exam"
                  )}
                </Button>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
    </Container>
  );
};

export default AddExam;
