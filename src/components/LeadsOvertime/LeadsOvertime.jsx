import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Grid, Card, CardHeader, CardContent, Typography, Divider, Skeleton } from '@mui/material';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import styled from '@emotion/styled';
import { useTheme } from '@emotion/react';
import SalesLineCard from './SalesLineCard';

const API = "https://backend-api-ebon-nu.vercel.app" || "http://localhost:4040";

const FlatCardBlock = styled(Grid)(({ theme }) => ({
  padding: '25px 25px',
  borderLeft: `1px solid ${theme?.palette?.background?.default}`,
  [theme?.breakpoints?.down('sm')]: {
    borderLeft: 'none',
    borderBottom: `1px solid ${theme?.palette?.background?.default}`
  },
  [theme?.breakpoints?.down('md')]: {
    borderBottom: `1px solid ${theme?.palette?.background?.default}`
  }
}));

const LeadsOvertime = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const theme = useTheme();

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const response = await axios.get(`${API}/dashboard`, { withCredentials: true });
        if (isMounted) {
          setDashboardData(response.data);
          setLoading(false);
        }
      } catch (error) {
        console.error('Error fetching revenue chart data:', error);
        setLoading(false);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12}>
          <Card style={{ marginTop: "30px", marginLeft: "20px" }} sx={{
            margin: "0.5rem",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.3), 0px 8px 16px rgba(0, 0, 0, 0.3)",
          }}>
            <CardHeader
              title={loading ? <Skeleton variant="text" animation="wave" /> : "Leads Over Time"}
            />
            <Divider />
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  {loading ? (
                    <Skeleton variant="rect" height={200} animation="wave" />
                  ) : (
                    <SalesLineCard
                      chartData={dashboardData?.totalDataCountPercentage}
                      title="Leads Generation Over Time"
                      percentage={`${dashboardData && dashboardData?.totalDataCountPercentage}%`}
                      icon={<TrendingDownIcon />}
                      footerData={[
                        {
                          value: `${dashboardData?.totalDataCount}`,
                          label: 'Total Leads'
                        },
                        {
                          value: `${dashboardData?.liveDuration}`,
                          label: 'Avg. Leads/Day'
                        }
                      ]}
                    />
                  )}
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sx={{ display: { md: 'block', sm: 'none' } }}>
          {dashboardData ? (
            <Card sx={{
              boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.3), 0px 8px 16px rgba(0, 0, 0, 0.3)",
            }}>
              <CardContent sx={{ p: '0 !important' }}>
                <Grid container alignItems="center" spacing={0}>
                  {Object.entries(dashboardData?.leadsCount || {}).map(([service, count]) => (
                    <FlatCardBlock key={service}>
                      <Grid container alignItems="center" spacing={1}>
                        <Grid item>
                          <Typography variant="subtitle4" align="left" sx={{ fontSize: "11px" }}>
                            {service.toUpperCase()}
                          </Typography>
                        </Grid>
                        <Grid item sm zeroMinWidth>
                          <Typography variant="h5" sx={{ color: theme?.palette?.error?.main }} align="right">
                            {count}
                          </Typography>
                        </Grid>
                      </Grid>
                    </FlatCardBlock>
                  ))}
                </Grid>
              </CardContent>
            </Card>
          ) : (
            <Skeleton variant='rect' animation="wave" />
          )}
        </Grid>
      </Grid>
    </div>
  );
};

LeadsOvertime.propTypes = {
  data: PropTypes.shape({
    totalDataCount: PropTypes.number.isRequired,
    liveDuration: PropTypes.number.isRequired,
    totalDataCountPercentage: PropTypes.number.isRequired
  }),
};

export default LeadsOvertime;
