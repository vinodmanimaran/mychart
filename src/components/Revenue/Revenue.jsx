import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, Divider, Grid, Skeleton, Typography, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Chart from 'react-apexcharts';
import './Revenue.css';

const RevenuChartCard = ({ chartData }) => {
  const theme = useTheme();
  const [barChartData, setBarChartData] = useState(null);
  const [loading, setLoading] = useState(true); 
  const savingstitle = "Microsavings & Investments";
  const RealEstatetitle = "Real Estate";
  const CreditCardtitle = "Credit Card";
  const vehicleInsurancestitle="Vehicle Insurance";

  useEffect(() => {
    if (chartData && chartData.leadsPercentage) {
      const seriesData = Object.values(chartData.leadsPercentage);
      const labels = Object.keys(chartData.leadsPercentage);
      
      const serviceColors = {
        Jobs: '#FF5733',
        Loans: '#33FFC6',
        [savingstitle]: '#3399FF',
        [RealEstatetitle]: '#FF33F9',
        [savingstitle]: '#F9FF33',
        [CreditCardtitle]: '#33FFAA',
        [vehicleInsurancestitle]: '#338AFF',
      };

      const newBarChartData = {
        series: [{ data: seriesData }],
        options: {
          chart: {
            type: 'bar',
          },
          xaxis: {
            categories: labels,
            labels:{
              style:{
                fontSize:"13px"
              }
            }
          },
          colors: labels.map(service => serviceColors[service]),
          responsive: [
            {
              breakpoint: 500,
              options: {
                chart: {
                  width: 300,
                },
                legend: {
                  position: 'bottom',
                },
              },
            },
          ],
        },
      };
      setBarChartData(newBarChartData);
      setLoading(false); 
    }
  }, [chartData]);

  const matchDownMd = useMediaQuery(theme.breakpoints.down('md'));
  const matchDownXs = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Card className='cards' sx={{
      boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.3), 0px 8px 16px rgba(0, 0, 0, 0.3)", 
    }}>

      {loading ?<Skeleton variant='text' animation="wave"/>
    :  
    <CardHeader
        title={
          <Typography component="div" className="card-header">
            Leads Over the Services
          </Typography>
        }
      />
    }
      
      <Divider />
      <CardContent>
        <Grid container spacing={2} direction={matchDownMd && !matchDownXs ? 'row' : 'column'} >
          <Grid item xs={12} sm={12} md={12} lg={12}>
            {barChartData && (
              <Chart series={barChartData.series} options={barChartData.options} height={350} width={400} />
            )}
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default RevenuChartCard;
