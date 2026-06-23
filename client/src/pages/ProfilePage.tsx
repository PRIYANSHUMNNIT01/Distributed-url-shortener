import { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';

import {
  Typography,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Link,
} from '@mui/material';

interface Url {
  _id: string;
  shortenUrlKey: string;
  clicks: number;
  analyticsEnabled: boolean;
}

function ProfilePage() {
  const [urls, setUrls] = useState<Url[]>([]);
  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const fetchUrls = async () => {
      try {
        const token =
          localStorage.getItem('token');

        const response = await fetch(
          'http://localhost/api/dashboard',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data =
          await response.json();

        setUrls(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUrls();
  }, []);

  return (
    <>
      <Typography
        variant="h4"
        gutterBottom
      >
        My Dashboard
      </Typography>

      {loading ? (
        <Typography>
          Loading...
        </Typography>
      ) : urls.length === 0 ? (
        <Typography>
          No URLs found for this account.
        </Typography>
      ) : (
        <Paper sx={{ p: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  Short URL
                </TableCell>

                <TableCell>
                  Clicks
                </TableCell>

                <TableCell>
                  Analytics
                </TableCell>

                <TableCell>
                  Action
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {urls.map((url) => (
                <TableRow
                  key={url._id}
                >
                  <TableCell>
                    <Link
                      href={`http://localhost/${url.shortenUrlKey}`}
                      target="_blank"
                    >
                      {
                        url.shortenUrlKey
                      }
                    </Link>
                  </TableCell>

                  <TableCell>
                    {url.clicks}
                  </TableCell>

                  <TableCell>
                    {url.analyticsEnabled
                      ? 'Enabled'
                      : 'Disabled'}
                  </TableCell>

                  <TableCell>
                    {url.analyticsEnabled ? (
                      <Link
                        component={
                          RouterLink
                        }
                        to={`/analytics/${url.shortenUrlKey}`}
                      >
                        View Analytics
                      </Link>
                    ) : (
                      '-'
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      )}
    </>
  );
}

export default ProfilePage;