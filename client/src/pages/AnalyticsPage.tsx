import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import {
  Paper,
  Typography,
  CircularProgress,
  Box,
  Grid,
  Card,
  CardContent,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@mui/material';

interface AnalyticsRecord {
  _id: string;
  country: string;
  region: string;
  city: string;
  browser: string;
  device: string;
  ip: string;
  createdAt: string;
}

interface AnalyticsResponse {
  totalVisitors: number;
  uniqueVisitors: number;
  uniqueBrowsers: number;
  uniqueDevices: number;
  analytics: AnalyticsRecord[];
}

const AnalyticsPage = (): JSX.Element => {
  const { shortenUrlKey } = useParams();

  const [data, setData] =
    useState<AnalyticsResponse | null>(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
       const response = await fetch(
  `http://localhost/api/analytics/${shortenUrlKey}`
);

        const result = await response.json();

        setData(result);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, [shortenUrlKey]);

  if (loading) {
    return (
      <Box textAlign="center" mt={5}>
        <CircularProgress />
      </Box>
    );
  }

  if (!data) {
    return (
      <Typography color="error">
        Failed to load analytics.
      </Typography>
    );
  }

  return (
    <Box>
      <Typography
        variant="h4"
        gutterBottom
      >
        Analytics Dashboard
      </Typography>

      <Grid container spacing={2} mb={3}>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">
                Total Visitors
              </Typography>

              <Typography variant="h3">
                {data.totalVisitors}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">
                Unique Visitors
              </Typography>

              <Typography variant="h3">
                {data.uniqueVisitors}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">
                Browsers
              </Typography>

              <Typography variant="h3">
                {data.uniqueBrowsers}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">
                Devices
              </Typography>

              <Typography variant="h3">
                {data.uniqueDevices}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Paper sx={{ p: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Country</TableCell>
              <TableCell>State</TableCell>
              <TableCell>City</TableCell>
              <TableCell>Browser</TableCell>
              <TableCell>Device</TableCell>
              <TableCell>IP</TableCell>
              <TableCell>Time</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {data.analytics.map((item) => (
              <TableRow key={item._id}>
                <TableCell>
                  {item.country}
                </TableCell>

                <TableCell>
                  {item.region}
                </TableCell>

                <TableCell>
                  {item.city}
                </TableCell>

                <TableCell>
                  {item.browser}
                </TableCell>

                <TableCell>
                  {item.device}
                </TableCell>

                <TableCell>
                  {item.ip}
                </TableCell>

                <TableCell>
                  {new Date(
                    item.createdAt
                  ).toLocaleString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
};

export default AnalyticsPage;