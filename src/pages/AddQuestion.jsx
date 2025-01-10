import React, { useState } from "react";
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Grid,
  CircularProgress,
  Alert,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { createQuestion } from "../redux/slices/questionSlice";
import { useNavigate } from "react-router-dom";

const AddQuestion = () => {
  const [formData, setFormData] = useState({
    title: "",
    options: ["", "", "", ""],
    correctAnswer: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, error } = useSelector((state) => state.question);
  const [successMessage, setSuccessMessage] = useState("");

  // ✅ Handle Input Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Handle Option Change
  const handleOptionChange = (index, value) => {
    const updatedOptions = [...formData.options];
    updatedOptions[index] = value;
    setFormData((prev) => ({
      ...prev,
      options: updatedOptions,
    }));
  };

  // ✅ Form Submission with Success Handling
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const action = await dispatch(createQuestion(formData));
      if (createQuestion.fulfilled.match(action)) {
        setSuccessMessage("🎉 Question added successfully!");
        setTimeout(() => {
          navigate("/");
        }, 2000);
      }
    } catch (error) {
      console.error("Error adding question:", error);
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
          boxShadow: 5,
          padding: 5,
          borderRadius: 4,
          border: "1px solid #ddd",
          backgroundColor: "#f5f5f5",
        }}
      >
        <CardContent>
          {/* Header */}
          <Typography variant="h3" textAlign="center" gutterBottom>
            📝 Add a New Question
          </Typography>

          {/* Success and Error Handling */}
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

          {/* Form Section */}
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              {/* Question Title */}
              <Grid item xs={12}>
                <TextField
                  label="Question Title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  fullWidth
                  required
                  variant="outlined"
                />
              </Grid>

              {/* Options Section */}
              {formData.options.map((option, index) => (
                <Grid item xs={12} key={index}>
                  <TextField
                    label={`Option ${index + 1}`}
                    value={option}
                    onChange={(e) => handleOptionChange(index, e.target.value)}
                    fullWidth
                    required
                    variant="outlined"
                  />
                </Grid>
              ))}

              {/* Correct Answer Dropdown */}
              <Grid item xs={12}>
                <FormControl fullWidth required>
                  <InputLabel id="correct-answer-label">
                    Select Correct Answer
                  </InputLabel>
                  <Select
                    labelId="correct-answer-label"
                    name="correctAnswer"
                    value={formData.correctAnswer}
                    onChange={handleChange}
                    variant="outlined"
                  >
                    {formData.options.map((option, index) => (
                      <MenuItem key={index} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </Select>
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
                    backgroundColor: "#4caf50",
                    borderRadius: 3,
                    padding: "12px 25px",
                    "&:hover": {
                      backgroundColor: "#388e3c",
                    },
                  }}
                >
                  {status === "loading" ? (
                    <CircularProgress size={24} />
                  ) : (
                    "Submit Question"
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

export default AddQuestion;
