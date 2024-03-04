import React, { useState, useEffect } from 'react';
import DataCard from '../../components/DataCard/DataCard';
import LeadsOvertime from '../../components/LeadsOvertime/LeadsOvertime';
import RevenuChartCard from '../../components/Revenue/Revenue';
import ProgressData from '../../components/Progressdata/Progressdata';
import { AppBar, Toolbar, Typography, Grid, IconButton, Drawer, List, ListItem, ListItemIcon, ListItemText, Skeleton, CardContent,Card, CardHeader, Divider } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import Layout from '../../components/Layout/Layout'
import axios from 'axios';
import DataTable from '../../components/DataTable/DataTable';

const API = import.meta.env.VITE_API || "http://localhost:4040";

const Analytics = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    let isMounted = true; // Flag to track component mount status
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API}/dashboard`, { withCredentials: true });
        const revenueChartData = response.data;
        if (isMounted) {
          setDashboardData(revenueChartData);
          setLoading(false);      // Set loading to false after data is fetched          
        }
      } catch (error) {
        console.error('Error fetching revenue chart data:', error);
      }
    };

    fetchData();

    // Cleanup function to set isMounted to false when component unmounts
    return () => {
      isMounted = false;
    };
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div>
      <Layout />
      <div className="row m-1 p-1">
        <div className="col">
          <DataCard />
        </div>
      </div>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={4}>
          <LeadsOvertime />
        </Grid>
        <Grid item xs={12} sm={4}>
          {loading ? (
            <Card
            style={{
              boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.3), 0px 8px 16px rgba(0, 0, 0, 0.3)",

            }}>
              <CardHeader>
                <Skeleton variant='text' animation="wave" width={10}/> 
              </CardHeader>

              <Divider/>
              <CardContent>

              <Skeleton variant='rect' width={450} height={450} animation="wave"/> 

              </CardContent>
            </Card>
          ) : (
            <RevenuChartCard chartData={dashboardData} />
          )}
        </Grid>
        <Grid item xs={12} sm={4}>
          <ProgressData />
        </Grid>
      </Grid>

      <Grid item xs={12} sm={6}></Grid>

      <DataTable />
    </div>
  );
};

export default Analytics;
