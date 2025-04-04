import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import PaymentDateChecker from "../components/PaymentDateChecker";
import {
  Box,
  Button,
  Typography,
  CircularProgress,
  Alert,
  Grid,
} from "@mui/material";
import COLORS from "../constants/Colors";

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

    // fetch profile on user auth using token from local storage
    fetchUserProfile();
  }, [token]);

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;
  if (!user)
    return (
      <Typography variant="body1" color={COLORS.secondary}>
        No user data available
      </Typography>
    );

  return (
    <Grid
      container
      direction="row"
      sx={{
        mt: 6,
        mb: 6,
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Grid size={10}>
        <Typography
          variant="h4"
          component="h1"
          sx={{
            color: COLORS.accent,
          }}
        >
          My Profile
        </Typography>
      </Grid>
      <Grid size={2}>
        <Button
          onClick={logout}
          variant="contained"
          sx={{
            backgroundColor: COLORS.accent,
          }}
          fullWidth
        >
          Logout
        </Button>
      </Grid>
      <Grid size={6}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            backgroundColor: COLORS.light,
            borderRadius: 2,
            padding: 4,
          }}
        >
          <Typography variant="h6" color={COLORS.accent} gutterBottom>
            Full Name:
          </Typography>
          <Typography variant="body1" color={COLORS.secondary}>
            {user.full_name}
          </Typography>

          <Typography variant="h6" color={COLORS.accent} sx={{ mt: 2 }}>
            Email:
          </Typography>
          <Typography variant="body1" color={COLORS.secondary}>
            {user.email}
          </Typography>

          <Typography variant="h6" color={COLORS.accent} sx={{ mt: 2 }}>
            Phone:
          </Typography>
          <Typography variant="body1" color={COLORS.secondary}>
            {user.phone ?? "N/A"}
          </Typography>
        </Box>
      </Grid>

      <Grid size={6}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            backgroundColor: COLORS.dark,
            borderRadius: 2,
            padding: 4,
          }}
        >
          <Typography variant="h6" color={COLORS.accent} gutterBottom>
            Company Info:
          </Typography>

          <Typography variant="body1" color={COLORS.light}>
            <strong>Name:</strong> {user.Company?.name}
          </Typography>
          <Typography variant="body1" color={COLORS.light}>
            <strong>Address:</strong>{" "}
            {`${user.Company?.address_line_1}, ${user.Company?.address_line_2}`}
          </Typography>
          <Typography variant="body1" color={COLORS.light}>
            <strong>City:</strong> {user.Company?.address_city}
          </Typography>
          <Typography variant="body1" color={COLORS.light}>
            <strong>State:</strong> {user.Company?.address_state}
          </Typography>
          <Typography variant="body1" color={COLORS.light}>
            <strong>Country:</strong> {user.Company?.address_country}
          </Typography>
          <Typography variant="body1" color={COLORS.light}>
            <strong>Expected Activity:</strong>{" "}
            {user.Company?.expected_activity}
          </Typography>
        </Box>
      </Grid>
      <Grid size={12}>
        <PaymentDateChecker />
      </Grid>
    </Grid>
  );
}

export default ProfilePage;
