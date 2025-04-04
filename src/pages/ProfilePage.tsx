import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import PaymentDateChecker from "../components/PaymentDateChecker";
import {
  Box,
  Button,
  Typography,
  Container,
  CircularProgress,
  Alert,
  Divider,
} from "@mui/material";

function ProfilePage() {
  const { token, logout } = useAuth();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetch(
          "https://api-dev.quicklyinc.com/auth/user",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const data = await response.json();
        if (data.success) {
          console.log(data);
          setUser(data.user);
        } else {
          setError("Failed to fetch user data");
        }
      } catch (err) {
        setError("Error fetching user data");
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [token]);

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;
  if (!user)
    return (
      <Typography variant="body1" color="textSecondary">
        No user data available
      </Typography>
    );

  return (
    <Container component="main" maxWidth="md">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: "#fff",
          padding: 4,
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Profile
        </Typography>

        <Box sx={{ width: "100%" }}>
          <Typography variant="h6" color="textPrimary" gutterBottom>
            Full Name:
          </Typography>
          <Typography variant="body1" color="textSecondary">
            {user.full_name}
          </Typography>

          <Typography variant="h6" color="textPrimary" sx={{ mt: 2 }}>
            Email:
          </Typography>
          <Typography variant="body1" color="textSecondary">
            {user.email}
          </Typography>

          <Typography variant="h6" color="textPrimary" sx={{ mt: 2 }}>
            Phone:
          </Typography>
          <Typography variant="body1" color="textSecondary">
            {user.phone ?? "N/A"}
          </Typography>
        </Box>

        <Divider sx={{ my: 3 }} />

        <Box sx={{ width: "100%" }}>
          <Typography variant="h6" color="textPrimary" gutterBottom>
            Company Info
          </Typography>

          <Typography variant="body1" color="textSecondary">
            <strong>Name:</strong> {user.Company?.name}
          </Typography>
          <Typography variant="body1" color="textSecondary">
            <strong>Address:</strong>{" "}
            {`${user.Company?.address_line_1}, ${user.Company?.address_line_2}`}
          </Typography>
          <Typography variant="body1" color="textSecondary">
            <strong>City:</strong> {user.Company?.address_city}
          </Typography>
          <Typography variant="body1" color="textSecondary">
            <strong>State:</strong> {user.Company?.address_state}
          </Typography>
          <Typography variant="body1" color="textSecondary">
            <strong>Country:</strong> {user.Company?.address_country}
          </Typography>
          <Typography variant="body1" color="textSecondary">
            <strong>Expected Activity:</strong>{" "}
            {user.Company?.expected_activity}
          </Typography>
        </Box>

        <Button
          onClick={logout}
          variant="contained"
          color="error"
          fullWidth
          sx={{ mt: 3 }}
        >
          Logout
        </Button>

        <Divider sx={{ my: 3 }} />

        <Typography variant="h6" color="textPrimary" gutterBottom>
          Payment Date Checker
        </Typography>
        <PaymentDateChecker />
      </Box>
    </Container>
  );
}

export default ProfilePage;
