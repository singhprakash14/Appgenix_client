import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getExamById } from "../redux/slices/examSlice";
import { createResult } from "../redux/slices/resultSlice";
import Cookies from "js-cookie";
import {
  Container,
  Typography,
  Card,
  CardContent,
  Alert,
  Button,
  FormControl,
  FormControlLabel,
  RadioGroup,
  Radio,
  Skeleton,
  Grid,
} from "@mui/material";

const Exam = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { selectedExam, status, error } = useSelector((state) => state.exam);
  const [responses, setResponses] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);  // Track submission

  useEffect(() => {
    dispatch(getExamById(id));
  }, [dispatch, id]);

  const handleOptionSelect = (questionId, option) => {
    setResponses((prevResponses) => ({
      ...prevResponses,
      [questionId]: option,
    }));
  };

  const calculateScore = () => {
    const correctAnswers = selectedExam.questions.filter(
      (question) => responses[question._id] === question.correctAnswer
    ).length;
    const totalQuestions = selectedExam.questions.length;
    const totalMarks = selectedExam.totalMarks;
    const score = (correctAnswers / totalQuestions) * totalMarks;
    return score;
  };

  const handleSubmit = () => {
    const obtainedMarks = calculateScore();
    dispatch(
      createResult({
        exam: id,
        student: Cookies.get("id"),
        marksObtained: obtainedMarks,
      })
    );
    setIsSubmitted(true); // Mark as submitted
    alert(`You have scored ${obtainedMarks} marks!`);
  };

  const renderAnswerOptions = (question) => {
    return question.options.map((option, idx) => {
      const isSelected = responses[question._id] === option;
      const isCorrect = option === question.correctAnswer;

      let label = option;
      let optionStyle = {};

      if (isSubmitted) {
        if (isCorrect) {
          label = `${option} (Correct)`; // Correct answer
          optionStyle = { color: "green", fontWeight: "bold" };
        } else if (isSelected) {
          label = `${option} (Your Answer, Incorrect)`; // Incorrect answer selected by user
          optionStyle = { color: "red", fontWeight: "bold" };
        }
      }

      return (
        <FormControlLabel
          key={idx}
          value={option}
          control={<Radio />}
          label={label}
          style={optionStyle}
        />
      );
    });
  };

  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      {status === "loading" ? (
        <Grid container spacing={3}>
          {[...Array(5)].map((_, index) => (
            <Grid item xs={12} key={index}>
              <Skeleton variant="rectangular" height={100} />
            </Grid>
          ))}
        </Grid>
      ) : error ? (
        <Alert severity="error">{error}</Alert>
      ) : selectedExam ? (
        <Card sx={{ boxShadow: 4, borderRadius: 3, padding: 3 }}>
          <CardContent>
            <Typography
              variant="h4"
              textAlign="center"
              fontWeight="bold"
              mb={2}
            >
              {selectedExam.title}
            </Typography>
            <Typography>
              <strong>Total Marks:</strong> {selectedExam.totalMarks}
            </Typography>
            <Typography>
              <strong>Status:</strong>{" "}
              {new Date() > new Date(selectedExam.endTime) ? "Ended" : "Active"}
            </Typography>

            {selectedExam.questions.map((question, index) => (
              <Card
                key={question._id}
                sx={{ my: 3, padding: 2, border: "1px solid #ddd" }}
              >
                <Typography variant="h6">
                  Q{index + 1}: {question.title}
                </Typography>

                <FormControl component="fieldset">
                  <RadioGroup
                    value={responses[question._id] || ""}
                    onChange={(e) =>
                      handleOptionSelect(question._id, e.target.value)
                    }
                    disabled={isSubmitted} // Disable after submission
                  >
                    {renderAnswerOptions(question)}
                  </RadioGroup>
                </FormControl>
              </Card>
            ))}

            <Button
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 3 }}
              onClick={handleSubmit}
              disabled={new Date() > new Date(selectedExam.endTime)}
            >
              {new Date() > new Date(selectedExam.endTime)
                ? "Exam Ended"
                : "Submit Exam"}
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Typography variant="h6" textAlign="center">
          No exam found for the given ID.
        </Typography>
      )}
    </Container>
  );
};

export default Exam;
