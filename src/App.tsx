import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { Container, Box, CssBaseline } from "@mui/material";
import "./App.css";

function PrivateRoute({ element }) {
  const { token } = useAuth();
  return token ? element : <Navigate to="/login" />;
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <CssBaseline />
        <Container maxWidth="lg">
          <Box
            sx={{
              minHeight: "100vh",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route
                path="/profile"
                element={<PrivateRoute element={<ProfilePage />} />}
              />
              <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
          </Box>
        </Container>
      </Router>
    </AuthProvider>
  );
}

export default App;
