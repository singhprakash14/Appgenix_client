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
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, error } = useSelector((state) => state.auth);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const action = await dispatch(loginUser(formData));
      if (loginUser.fulfilled.match(action)) {
        navigate("/"); // Redirect to dashboard on success
      }
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  return (
    <Container
      maxWidth="sm"
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
          padding: 4,
          borderRadius: 4,
          border: "1px solid #e0e0e0",
          backgroundColor: "#f9f9f9",
        }}
      >
        <CardContent>
          {/* Header */}
          <Typography variant="h4" textAlign="center" gutterBottom>
            🚪 Welcome Back
          </Typography>
          <Typography
            variant="subtitle1"
            textAlign="center"
            color="textSecondary"
            mb={3}
          >
            Please login to your account.
          </Typography>

          {error && (
            <Typography color="error" textAlign="center" mb={2}>
              {error}
            </Typography>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              {/* Email Field */}
              <Grid item xs={12}>
                <TextField
                  label="Email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  fullWidth
                  required
                />
              </Grid>

              {/* Password Field */}
              <Grid item xs={12}>
                <TextField
                  label="Password"
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  fullWidth
                  required
                />
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
                    borderRadius: 3,
                    padding: "10px 20px",
                    "&:hover": {
                      backgroundColor: "#115293",
                    },
                  }}
                >
                  {status === "loading" ? (
                    <CircularProgress size={24} />
                  ) : (
                    "Login"
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

export default Login;
