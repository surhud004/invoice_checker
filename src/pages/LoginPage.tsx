import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Typography,
  Box,
  Grid,
  Link,
  Alert,
} from "@mui/material";
import Banner from "../assets/invoice-banner.jpg";
import Logo from "../assets/logo.png";
import COLORS from "../constants/Colors";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (password && password.length < 8) {
        setError("Password must be minimum 8 characters");
      }
      await login(email, password);
      navigate("/profile");
    } catch (err) {
      setError("Invalid credentials");
    }
  };

  return (
    <Grid
      container
      direction="row"
      sx={{
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Grid size={6}>
        <Box
          component={"form"}
          onSubmit={handleSubmit}
          sx={{
            width: "100%",
            maxWidth: 400,
            p: 3,
            bgcolor: COLORS.light,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Box
            component="img"
            src={Logo}
            alt="Logo"
            sx={{
              width: "12%",
              borderRadius: 2,
              paddingBottom: "20px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          />
          <Typography variant="h5" mb={2} align="left">
            Log in
          </Typography>
          <Typography variant="subtitle2" sx={{ color: COLORS.lighter }}>
            Welcome back! Please sign in to continue.
          </Typography>
          <TextField
            label="Business email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            margin="normal"
            required
            variant="outlined"
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            margin="normal"
            required
            variant="outlined"
          />
          <Link
            href="#"
            variant="body2"
            sx={{
              display: "block",
              textAlign: "right",
              fontWeight: "600",
              mt: 1,
              color: COLORS.secondary,
            }}
          >
            Forgot?
          </Link>
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              mt: 2,
              backgroundColor: COLORS.secondary,
            }}
          >
            Log in
          </Button>
          {error && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {error}
            </Alert>
          )}
          <Typography
            variant="body2"
            mt={2}
            textAlign="center"
            sx={{ color: COLORS.lighter }}
          >
            Don’t have an account?{" "}
            <Link
              href="#"
              variant="body2"
              sx={{ color: COLORS.secondary, fontWeight: "600" }}
            >
              Get started for free
            </Link>
          </Typography>
        </Box>
      </Grid>

      <Grid size={6}>
        <Box
          component="img"
          src={Banner}
          alt="Dashboard preview"
          sx={{
            width: "100%",
            borderRadius: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        />
      </Grid>
    </Grid>
  );
}

export default LoginPage;
