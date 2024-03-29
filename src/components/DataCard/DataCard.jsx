import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useTheme } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import MonetizationOnTwoToneIcon from '@mui/icons-material/MonetizationOnTwoTone';
import AccountBalanceTwoToneIcon from '@mui/icons-material/AccountBalanceTwoTone';
import CreditCardTwoToneIcon from '@mui/icons-material/CreditCardTwoTone';
import HomeTwoToneIcon from '@mui/icons-material/HomeTwoTone';
import ThumbUpAltTwoToneIcon from '@mui/icons-material/ThumbUpAltTwoTone';
import AssignmentTurnedInTwoToneIcon from '@mui/icons-material/AssignmentTurnedInTwoTone';
import DirectionsCarTwoToneIcon from '@mui/icons-material/DirectionsCarTwoTone';
import ReportCard from '../../components/ReportCard/ReportCard';
import { Skeleton } from '@mui/material';
export const gridSpacing = 3;

const getIcon = (service) => {
  switch (service) {
    case 'Jobs':
      return MonetizationOnTwoToneIcon;
    case 'Loans':
      return AccountBalanceTwoToneIcon;
    case 'Credit Card':
      return CreditCardTwoToneIcon;
    case 'Real Estate':
      return HomeTwoToneIcon;
    case 'Microsavings & Investments':
      return ThumbUpAltTwoToneIcon;
    case 'Insurance':
      return AssignmentTurnedInTwoToneIcon;
    case 'Vehicle Insurance':
      return DirectionsCarTwoToneIcon;
    default:
      return null;
  }
};

const API = import.meta.env.VITE_API || "http://localhost:4040";

const DataCard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true); 
  const theme = useTheme();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API}/dashboard`,{withCredentials:true});
        const revenueChartData = response.data; 
        setDashboardData(revenueChartData); 
        setLoading(false); 
      } catch (error) {
        console.error('Error fetching revenue chart data:', error);
      }
    };

    fetchData();
  }, []);



  return (
    <div>
      {!dashboardData ? (
        <Grid item xs={12} sx={{ margin: "10px"}}>
          <Grid container spacing={gridSpacing}>
            {[...Array(4)].map((_, index) => (
              <Grid item lg={3} sm={6} xs={12} key={index}>
                <Skeleton variant="square" width="100%" animation="wave" height={200} />
              </Grid>
            ))}
          </Grid>
        </Grid>
      ) : (
        <Grid item xs={12} sx={{ margin: "10px" }}>
          <Grid container spacing={gridSpacing}>
            {Object.entries(dashboardData?.leadsCount).map(([service, count]) => (
              <Grid item lg={3} sm={6} xs={12} key={service}>
                <ReportCard
                  primary={String(count)}
                  secondary={service}
                  color={theme.palette.warning.main}
                  iconPrimary={getIcon(service)}
                  loading={loading} 
                />
              </Grid>
            ))}
          </Grid>
        </Grid>
      )}
    </div>
  );
};

export default DataCard;
