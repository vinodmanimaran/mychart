import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Grid, Card, CardHeader, Divider, CardContent, Typography, LinearProgress, Skeleton } from '@mui/material';


const API_URL = "https://backend-api-u4m5.onrender.com" || "http://localhost:4040";


const ProgressData = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true); // State to manage loading status
  const gridSpacing = 2; // Define grid spacing as per your requirement

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}/dashboard`);
        const revenueChartData = response.data; 
        console.log('Revenue Chart Data:', revenueChartData); 
        setDashboardData(revenueChartData); 
        setLoading(false); // Set loading to false once data is fetched
      } catch (error) {
        console.error('Error fetching revenue chart data:', error);
      }
    };
  
    fetchData();
  }, []);

  return (
    <div>
      <Grid item lg={12} xs={12}>
        <Card sx={{
      margin: "0.5rem",
      boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.3), 0px 8px 16px rgba(0, 0, 0, 0.3)", 
    }}>
          <CardHeader
            title={
              loading?(
                <Skeleton variant="text" />

              ):(
                <Typography component="div" className="card-header">
                Leads
              </Typography>
              )
              
            }
          />
          <Divider />
          <CardContent>
            <Grid container spacing={gridSpacing}>
              {loading ? ( // Skeleton loading effect for the card content
                [...Array(4)].map((_, index) => (
                  <Grid item xs={12} key={index}>
                    <Skeleton variant="text" />
                  </Grid>
                ))
              ) : (
                dashboardData &&
                Object.entries(dashboardData.leadsPercentage).map(([service, percentage]) => (
                  <Grid item xs={12} key={service}>
                    <Grid container alignItems="center" spacing={1}>
                      <Grid item sm zeroMinWidth>
                        <Typography variant="body2">{service}</Typography>
                      </Grid>
                      <Grid item>
                        <Typography variant="body2" align="right">
                          {percentage}%
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <LinearProgress
                          variant="determinate"
                          aria-label={service}
                          value={parseFloat(percentage)}
                          color="primary"
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                ))
              )}
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </div>
  );
};

export default ProgressData;
