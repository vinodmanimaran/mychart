import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Grid, Card, CardHeader, Divider, CardContent, Typography, LinearProgress, Skeleton } from '@mui/material';


const API = import.meta.env.VITE_API || "http://localhost:4040";


const ProgressData = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true); 
  const gridSpacing = 2; 

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API}/dashboard`, { withCredentials: true });
        const revenueChartData = response.data; 
        console.log('Revenue Chart Data:', revenueChartData); 
        if(isMounted){
          setDashboardData(revenueChartData); 
          setLoading(false);
        }
       
      } catch (error) {
        console.error('Error fetching revenue chart data:', error);
      }
    };
  
    fetchData();

    return () => {
      isMounted = false;
    };
  }, []);


  useEffect(() => {
    const skeletonTimer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(skeletonTimer);
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
                <Skeleton variant="text"  animation="wave" />

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
              {loading ? ( 
                [...Array(4)].map((_, index) => (
                  <Grid item xs={12} key={index}>
                    <Skeleton variant="text"  animation="wave" />
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
