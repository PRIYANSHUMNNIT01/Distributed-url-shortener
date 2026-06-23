import { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
} from '@mui/material';

function LoginPage() {
  const [email, setEmail] =
    useState('');

  const [password, setPassword] =
    useState('');

  const [loading, setLoading] =
    useState(false);

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    setLoading(true);

    try {
      const response = await fetch(
        'http://localhost/api/auth/login',
        {
          method: 'POST',
          headers: {
            'Content-Type':
              'application/json',
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data =
        await response.json();

      if (data.token) {
        localStorage.setItem(
          'token',
          data.token
        );

        window.location.href =
          '/profile';
      } else {
        alert(
          data.message ||
            'Login Failed'
        );
      }
    } catch (error) {
      console.error(error);
      alert('Server Error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background:
          'linear-gradient(135deg,#0f0f0f,#1a1a2e)',
      }}
    >
      <Paper
        elevation={10}
        sx={{
          p: 5,
          width: 400,
          borderRadius: 4,
          background:
            'rgba(25,25,25,0.95)',
        }}
      >
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{
            color: '#7c3aed',
            fontWeight: 'bold',
          }}
        >
          Welcome Back
        </Typography>

        <Typography
          align="center"
          sx={{
            color: '#aaa',
            mb: 3,
          }}
        >
          Login to manage your
          shortened URLs
        </Typography>

        <form
          onSubmit={handleSubmit}
        >
          <TextField
            fullWidth
            label="Email"
            margin="normal"
            value={email}
            onChange={(e) =>
              setEmail(
                e.target.value
              )
            }
          />

          <TextField
            fullWidth
            type="password"
            label="Password"
            margin="normal"
            value={password}
            onChange={(e) =>
              setPassword(
                e.target.value
              )
            }
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={loading}
            sx={{
              mt: 3,
              py: 1.5,
              fontSize: '1rem',
              background:
                '#7c3aed',
            }}
          >
            {loading
              ? 'Signing In...'
              : 'Login'}
          </Button>
        </form>

        <Typography
          align="center"
          sx={{
            mt: 3,
            color: '#aaa',
          }}
        >
          Don't have an account?
          {' '}
          <a
            href="/register"
            style={{
              color: '#7c3aed',
            }}
          >
            Register
          </a>
        </Typography>
      </Paper>
    </Box>
  );
}

export default LoginPage;