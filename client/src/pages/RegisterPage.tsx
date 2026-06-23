import { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
} from '@mui/material';

function RegisterPage() {
  const [name, setName] =
    useState('');

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
        '/api/auth/register',
        {
          method: 'POST',
          headers: {
            'Content-Type':
              'application/json',
          },
          body: JSON.stringify({
            name,
            email,
            password,
          }),
        }
      );

      const data =
        await response.json();

      alert(data.message);

      if (
        data.message?.includes(
          'success'
        )
      ) {
        window.location.href =
          '/login';
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
          Create Account
        </Typography>

        <Typography
          align="center"
          sx={{
            color: '#aaa',
            mb: 3,
          }}
        >
          Start tracking and
          managing your URLs
        </Typography>

        <form
          onSubmit={handleSubmit}
        >
          <TextField
            fullWidth
            label="Full Name"
            margin="normal"
            value={name}
            onChange={(e) =>
              setName(
                e.target.value
              )
            }
          />

          <TextField
            fullWidth
            label="Email"
            margin="normal"
            type="email"
            value={email}
            onChange={(e) =>
              setEmail(
                e.target.value
              )
            }
          />

          <TextField
            fullWidth
            label="Password"
            margin="normal"
            type="password"
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
              ? 'Creating Account...'
              : 'Register'}
          </Button>
        </form>

        <Typography
          align="center"
          sx={{
            mt: 3,
            color: '#aaa',
          }}
        >
          Already have an
          account?{' '}
          <a
            href="/login"
            style={{
              color: '#7c3aed',
            }}
          >
            Login
          </a>
        </Typography>
      </Paper>
    </Box>
  );
}

export default RegisterPage;