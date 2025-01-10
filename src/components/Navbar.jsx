import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Tooltip,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import {
  Logout as LogoutIcon,
  Home as HomeIcon,
  Login as LoginIcon,
  AppRegistration as SignUpIcon,
  AddCircle as AddIcon,
} from "@mui/icons-material";
import { logout } from "../redux/slices/authSlice"; // Assuming logout action is available in authSlice
import Cookies from "js-cookie";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const userRole = Cookies.get("userRole");

  return (
    <AppBar
      position="sticky"
      sx={{
        mb: 4,
        background: "linear-gradient(45deg, #6a1b9a, #8e24aa)", // Gradient background
        boxShadow: 4,
      }}
    >
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Exam Portal
        </Typography>
        <Box>
          {/* Home Link */}
          <Tooltip title="Home">
            <IconButton
              color="inherit"
              component={Link}
              to="/"
              sx={{
                "&:hover": {
                  color: "#ff4081", // Accent color on hover
                },
              }}
            >
              <HomeIcon />
            </IconButton>
          </Tooltip>

          {/* Login Link */}
          {!userRole && (
            <Tooltip title="Login">
              <IconButton
                color="inherit"
                component={Link}
                to="/login"
                sx={{
                  "&:hover": {
                    color: "#ff4081", // Accent color on hover
                  },
                }}
              >
                <LoginIcon />
              </IconButton>
            </Tooltip>
          )}

          {/* Signup Link */}
          {!userRole && (
            <Tooltip title="Signup">
              <IconButton
                color="inherit"
                component={Link}
                to="/signup"
                sx={{
                  "&:hover": {
                    color: "#ff4081", // Accent color on hover
                  },
                }}
              >
                <SignUpIcon />
              </IconButton>
            </Tooltip>
          )}

          {/* Conditionally render Add Question and Add Exam links for admins */}
          {userRole === "ADMIN" && (
            <>
              <Tooltip title="Add Question">
                <IconButton
                  color="inherit"
                  component={Link}
                  to="/admin/add-question"
                  sx={{
                    "&:hover": {
                      color: "#ff4081", // Accent color on hover
                    },
                  }}
                >
                  <AddIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Add Exam">
                <IconButton
                  color="inherit"
                  component={Link}
                  to="/admin/add-exam"
                  sx={{
                    "&:hover": {
                      color: "#ff4081", // Accent color on hover
                    },
                  }}
                >
                  <AddIcon />
                </IconButton>
              </Tooltip>
            </>
          )}

          {/* Logout button */}
          {userRole && (
            <Tooltip title="Logout">
              <IconButton
                color="inherit"
                onClick={handleLogout}
                sx={{
                  "&:hover": {
                    color: "#ff4081", // Accent color on hover
                  },
                }}
              >
                <LogoutIcon />
              </IconButton>
            </Tooltip>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
