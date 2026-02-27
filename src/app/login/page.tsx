"use client";

import { useState } from "react";
import { 
  TextField, Button, Container, Typography, Box, Paper, 
  IconButton, InputAdornment, Link, Alert, Divider 
} from "@mui/material";
import { Visibility, VisibilityOff, Login as LoginIcon } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      const res = await axios.post("http://localhost:3002/api/auth/login", { email, password });
      if (res.data.success) {
        localStorage.setItem("token", res.data.token);
        router.push("/dashboard");
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Invalid credentials");
    }
  };

  return (
    <Box sx={{ 
      minHeight: "100vh", display: "flex", alignItems: "center",
      background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)" 
    }}>
      <Container maxWidth="xs">
        <Paper elevation={10} sx={{ p: 5, borderRadius: 4, textAlign: "center", backdropFilter: "blur(10px)" }}>
          <Typography variant="h4" fontWeight="700" color="primary" gutterBottom>
            Welcome Back
          </Typography>
          <Typography variant="body2" color="textSecondary" mb={3}>
            Please enter your details to sign in
          </Typography>

          {error && <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }}>{error}</Alert>}

          <form onSubmit={handleLogin}>
            <TextField
              fullWidth label="Email" variant="outlined" margin="normal"
              value={email} onChange={(e) => setEmail(e.target.value)}
              sx={{ "& .MuiOutlinedInput-root": { borderRadius: 3 } }}
            />
            <TextField
              fullWidth label="Password" type={showPassword ? "text" : "password"}
              variant="outlined" margin="normal" value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{ "& .MuiOutlinedInput-root": { borderRadius: 3 } }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Button
              fullWidth type="submit" variant="contained" size="large"
              startIcon={<LoginIcon />}
              sx={{ mt: 3, py: 1.5, borderRadius: 3, fontWeight: "bold", textTransform: "none" }}
            >
              Sign In
            </Button>
          </form>

          <Divider sx={{ my: 3 }}>OR</Divider>

          <Typography variant="body2">
            Don't have an account?{" "}
            <Link href="/signup" underline="none" fontWeight="600">
              Create Account
            </Link>
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
}