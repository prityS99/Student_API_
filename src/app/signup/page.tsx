"use client";

import { useState } from "react";
import { 
  TextField, Button, Container, Typography, Box, Paper, 
  Link, Alert, Grid 
} from "@mui/material";
import { PersonAdd as PersonAddIcon } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function SignupPage() {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      const res = await axios.post("http://localhost:3002/api/auth/register", formData);
      if (res.data.success) {
        setSuccess(true);
        setTimeout(() => router.push("/login"), 2000);
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <Box sx={{ 
      minHeight: "100vh", display: "flex", alignItems: "center",
   background: "linear-gradient(135deg, #f5f7fa 0%, #7096d2 100%)" 
    }}>
      <Container maxWidth="sm">
        <Paper elevation={15} sx={{ p: 5, borderRadius: 5 }}>
          <Typography variant="h4" fontWeight="800" align="center" gutterBottom>
            Join Us
          </Typography>
          <Typography variant="body1" align="center" color="textSecondary" mb={4}>
            Create your account to get started
          </Typography>

          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
          {success && <Alert severity="success" sx={{ mb: 2 }}>Success! Redirecting...</Alert>}

          <form onSubmit={handleSignup}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField fullWidth label="Full Name" name="name" required
                  onChange={(e: any) => setFormData({...formData, name: e.target.value})}
                  sx={{ "& .MuiOutlinedInput-root": { borderRadius: 3 } }} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth label="Email" name="email" type="email" required
                  onChange={(e: any) => setFormData({...formData, email: e.target.value})}
                  sx={{ "& .MuiOutlinedInput-root": { borderRadius: 3 } }} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth label="Phone" name="phone" required
                  onChange={(e: any) => setFormData({...formData, phone: e.target.value})}
                  sx={{ "& .MuiOutlinedInput-root": { borderRadius: 3 } }} />
              </Grid>
              <Grid item xs={12}>
                <TextField fullWidth label="Password" name="password" type="password" required
                  onChange={(e: any) => setFormData({...formData, password: e.target.value})}
                  sx={{ "& .MuiOutlinedInput-root": { borderRadius: 3 } }} />
              </Grid>
            </Grid>

            <Button
              fullWidth type="submit" variant="contained" size="large" color="secondary"
              startIcon={<PersonAddIcon />}
              sx={{ mt: 4, py: 1.5, borderRadius: 3, fontWeight: "bold", textTransform: "none" }}
            >
              Register Now
            </Button>
          </form>

          <Box mt={3} textAlign="center">
            <Typography variant="body2">
              Already a member?{" "}
              <Link href="/login" underline="none" fontWeight="600" color="secondary">
                Log In
              </Link>
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}