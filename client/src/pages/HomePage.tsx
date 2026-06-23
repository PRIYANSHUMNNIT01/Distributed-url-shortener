import {
  Typography,
  Box,
  Paper,
  Grid,
} from '@mui/material';
import { useSubmitUrlMutation } from '../slices/urlsApiSlice';
import UrlData from '../components/UrlData';
import UrlForm from '../components/UrlForm';

const HomePage = (): JSX.Element => {
  const [
    trigger,
    {
      data,
      isLoading,
      isSuccess,
      isError,
    },
  ] = useSubmitUrlMutation();

  return (
    <>
      <Typography
        component="h1"
        variant="h3"
        color="primary"
        align="center"
        gutterBottom
        fontWeight="bold"
      >
        URL Shortener Pro
      </Typography>

      <Typography
        variant="h6"
        align="center"
        color="text.secondary"
        sx={{ mb: 4 }}
      >
        Shorten URLs instantly. No signup required.
      </Typography>

      <Typography
        align="center"
        sx={{ mb: 4 }}
      >
        Create clean, shareable links in seconds.
        Sign in later to unlock analytics,
        click tracking, device insights, and
        your personal dashboard.
      </Typography>

      <UrlForm
        isSuccess={isSuccess}
        isLoading={isLoading}
        trigger={(originalUrl: string) =>
          trigger({ originalUrl })
        }
      />

      <UrlData
        isSuccess={isSuccess}
        isError={isError}
        shortenUrlKey={data}
      />

      <Box sx={{ mt: 6 }}>
        <Typography
          variant="h5"
          align="center"
          gutterBottom
        >
          Why Use This Platform?
        </Typography>

        <Grid
          container
          spacing={2}
          sx={{ mt: 2 }}
        >
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2 }}>
              <Typography
                variant="h6"
                gutterBottom
              >
                ⚡ Fast URL Shortening
              </Typography>

              <Typography>
                Generate unique short links
                instantly with distributed
                token generation.
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2 }}>
              <Typography
                variant="h6"
                gutterBottom
              >
                📊 Analytics Dashboard
              </Typography>

              <Typography>
                Login to track clicks,
                devices, browsers, and
                visitor insights.
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2 }}>
              <Typography
                variant="h6"
                gutterBottom
              >
                🚀 High Performance
              </Typography>

              <Typography>
                Powered by Redis caching,
                Docker containers, and
                Nginx load balancing.
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2 }}>
              <Typography
                variant="h6"
                gutterBottom
              >
                🔒 Secure Accounts
              </Typography>

              <Typography>
                JWT authentication enables
                protected dashboards and
                future analytics access.
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Box>

      <Paper
        sx={{
          mt: 5,
          p: 3,
          textAlign: 'center',
        }}
      >
        <Typography variant="h6">
          Want Analytics?
        </Typography>

        <Typography
          color="text.secondary"
          sx={{ mt: 1 }}
        >
          Guest users can shorten URLs
          instantly. Create an account to
          access analytics and manage all
          your links from one dashboard.
        </Typography>
      </Paper>
    </>
  );
};

export default HomePage;