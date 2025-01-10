import React, { useEffect } from "react";
import {
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  CircularProgress,
  Alert,
  Button,
  Chip,
  Box,
  Skeleton,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllExams } from "../redux/slices/examSlice";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { exams, status, error } = useSelector(
    (state) => state.exam || { exams: [], status: "idle", error: null }
  );

  useEffect(() => {
    dispatch(fetchAllExams());
  }, [dispatch]);

  const getStatus = (startTime, endTime) => {
    const now = new Date();
    if (now < new Date(startTime)) {
      return { label: "Upcoming", color: "info" };
    } else if (now >= new Date(startTime) && now <= new Date(endTime)) {
      return { label: "Active", color: "success" };
    } else {
      return { label: "Ended", color: "error" };
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 5 }}>
      <Typography
        variant="h3"
        textAlign="center"
        fontWeight="bold"
        color="primary"
        gutterBottom
      >
        📝 Available Exams
      </Typography>

      {/* Loading Spinner */}
      {status === "loading" && (
        <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
          <CircularProgress size={50} />
        </Box>
      )}

      {/* Error Message */}
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {/* No Exams Available */}
      {exams.length === 0 && status !== "loading" ? (
        <Typography textAlign="center" color="textSecondary">
          No exams available.
        </Typography>
      ) : (
        <Grid container spacing={4}>
          {status === "loading"
            ? [...Array(6)].map((_, idx) => (
                <Grid item xs={12} sm={6} md={4} key={idx}>
                  <Skeleton
                    variant="rectangular"
                    height={300}
                    sx={{ borderRadius: 3 }}
                  />
                </Grid>
              ))
            : exams.map((exam) => {
                const examStatus = getStatus(exam.startTime, exam.endTime);
                return (
                  <Grid item xs={12} sm={6} md={4} key={exam._id}>
                    <Card
                      sx={{
                        boxShadow: 6,
                        borderRadius: 3,
                        backgroundColor: "#ffffff",
                        border: "2px solid #e0e0e0",
                        transition: "transform 0.2s ease-in-out",
                        "&:hover": {
                          transform: "scale(1.05)",
                          border: "2px solid #1565C0",
                        },
                      }}
                    >
                      <CardContent>
                        {/* Title with Chip Status */}
                        <Box
                          display="flex"
                          justifyContent="space-between"
                          alignItems="center"
                        >
                          <Typography variant="h5" fontWeight="bold" noWrap>
                            {exam.title}
                          </Typography>
                          <Chip
                            label={examStatus.label}
                            color={examStatus.color}
                            size="small"
                          />
                        </Box>

                        {/* Exam Details */}
                        <Typography sx={{ mt: 2 }}>
                          <strong>Total Marks:</strong> {exam.totalMarks}
                        </Typography>
                        <Typography>
                          <strong>Start Time:</strong>{" "}
                          {new Date(exam.startTime).toLocaleString()}
                        </Typography>
                        <Typography>
                          <strong>End Time:</strong>{" "}
                          {new Date(exam.endTime).toLocaleString()}
                        </Typography>

                        {/* Conditional Button */}
                        <Button
                          variant="contained"
                          fullWidth
                          sx={{
                            mt: 2,
                            borderRadius: 2,
                            py: 1,
                            backgroundColor:
                              examStatus.label === "Active"
                                ? "#4CAF50"
                                : "#757575",
                            "&:hover": {
                              backgroundColor:
                                examStatus.label === "Active"
                                  ? "#388E3C"
                                  : "#616161",
                            },
                          }}
                          disabled={examStatus.label !== "Active"}
                          onClick={() => navigate(`/exam/${exam._id}`)}
                        >
                          {examStatus.label === "Active"
                            ? "Start Exam"
                            : "View Details"}
                        </Button>
                      </CardContent>
                    </Card>
                  </Grid>
                );
              })}
        </Grid>
      )}
    </Container>
  );
};

export default Home;
