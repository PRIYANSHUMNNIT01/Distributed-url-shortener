import { Outlet, Link } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import {
  Container,
  Box,
  Button,
} from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import theme from '../theme/theme';

const Layout = (): JSX.Element => {
  const token = localStorage.getItem('token');

  const logout = () => {
    localStorage.removeItem('token');
    window.location.href = '/';
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Container maxWidth="lg">
        <Box
          sx={{
            py: 2,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Button component={Link} to="/">
            Home
          </Button>

          {!token ? (
            <Box>
              <Button component={Link} to="/login">
                Login
              </Button>

              <Button component={Link} to="/register">
                Register
              </Button>
            </Box>
          ) : (
            <Box>
              <Button
                component={Link}
                to="/profile"
              >
                Dashboard
              </Button>

              <Button
                onClick={logout}
                color="error"
              >
                Logout
              </Button>
            </Box>
          )}
        </Box>

        <Outlet />
      </Container>
    </ThemeProvider>
  );
};

export default Layout;