import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Grid, Card, CardHeader, CardContent, Typography, Divider, Skeleton } from '@mui/material';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import styled from '@emotion/styled';
import { useTheme } from '@emotion/react';
import SalesLineCard from './SalesLineCard';

const API="https://backend-api-ebon-nu.vercel.app" || "http://localhost:4040"

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
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API}/dashboard`,{withCredentials:true});
        setDashboardData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching revenue chart data:', error);
      }
    };

    fetchData();
  }, []);

  function generateChartData(data) {
    const leadsData = data?.jobs;
    if (!leadsData || leadsData.length === 0) return null;

    const leadsPerDay = {};

    leadsData.forEach(lead => {
      const createdAt = new Date(lead.createdAt).toLocaleDateString();
      leadsPerDay[createdAt] = (leadsPerDay[createdAt] || 0) + 1;
    });

    const chartData = {
      labels: Object.keys(leadsPerDay),
      datasets: [
        {
          label: 'Leads Generation',
          data: Object.values(leadsPerDay)
        }
      ]
    };

    return chartData;
  }

  function calculateAverageLeadsPerDay(data) {
    if (!data || !data.jobs || !data.leadsCount || !data.leadsCount.jobs) {
      console.log("Invalid data provided");
      return 0;
    }

    const jobs = data.jobs;
    const creationTimestamps = jobs.map(job => new Date(job.createdAt).getTime());

    const startDate = new Date(Math.min(...creationTimestamps));
    const endDate = new Date(Math.max(...creationTimestamps));

    const durationInDays = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)) || 1;

    const totalLeads = data.leadsCount.jobs || 0;

    console.log("Total leads:", totalLeads);
    console.log("Duration in days:", durationInDays);
    const averageLeadsPerDay = totalLeads / durationInDays;

    console.log("Average leads per day:", averageLeadsPerDay.toFixed(2));

    return averageLeadsPerDay.toFixed(2);
  }



 

  const gridSpacing = 2;

  return (
    <div>
      <Grid container spacing={gridSpacing}>
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
              <Grid container spacing={gridSpacing}>
                <Grid item xs={12}>
                  {loading ? (
                    <Skeleton variant="rect" height={200}  animation="wave" />
                  ) : (
                    <SalesLineCard
                      chartData={generateChartData(dashboardData)}
                      title="Leads Generation Over Time"
                      percentage={`${dashboardData.leadsPercentage.jobs}%`}
                      icon={<TrendingDownIcon />}
                      footerData={[
                        {
                          value: `${dashboardData.leadsCount.jobs}`,
                          label: 'Total Leads'
                        },
                        {
                          value: `${calculateAverageLeadsPerDay(dashboardData)}`,
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
                  {Object.entries(dashboardData.leadsCount).map(([service, count]) => (
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
            <Skeleton variant='square' animation="wave" />
          )}
        </Grid>
      </Grid>
    </div>
  );
};

export default LeadsOvertime;
