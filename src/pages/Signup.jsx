import React, { useState } from "react";
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  FormControlLabel,
  Checkbox,
  Grid,
  CircularProgress,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "STUDENT",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, error } = useSelector((state) => state.auth);

  // ✅ Handle Change in Input Fields
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Handle Checkbox Toggle for Admin Role
  const handleRoleToggle = (e) => {
    setFormData((prev) => ({
      ...prev,
      role: e.target.checked ? "ADMIN" : "STUDENT",
    }));
  };

  // ✅ Handle Form Submission with Redirect After Success
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const action = await dispatch(registerUser(formData));
      if (registerUser.fulfilled.match(action)) {
        navigate("/"); // Redirect to home page after successful registration
      }
    } catch (error) {
      console.error("Registration failed:", error);
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
          <Typography variant="h4" textAlign="center" gutterBottom>
            🚀 Create Your Account
          </Typography>
          <Typography
            variant="subtitle1"
            textAlign="center"
            color="textSecondary"
            mb={3}
          >
            Join the platform today!
          </Typography>

          {error && (
            <Typography color="error" textAlign="center">
              {error}
            </Typography>
          )}

          {/* Form Section */}
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              {/* Name Field */}
              <Grid item xs={12}>
                <TextField
                  label="Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  fullWidth
                  required
                />
              </Grid>

              {/* Email Field */}
              <Grid item xs={12}>
                <TextField
                  label="Email"
                  name="email"
                  type="email"
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

              {/* Role Selection Checkbox */}
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formData.role === "ADMIN"}
                      onChange={handleRoleToggle}
                      color="primary"
                    />
                  }
                  label="Register as Admin"
                />
              </Grid>

              {/* Submit Button Section */}
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
                    "Sign Up"
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

export default Signup;
