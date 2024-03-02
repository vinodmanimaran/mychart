import React from 'react';
import { useTheme } from '@mui/material/styles';
import { Box, Card, CardContent, Grid, Typography } from '@mui/material';

// third-party
import Chart from 'react-apexcharts';

// ==============================|| SALES LINE CARD ||============================== //

const SalesLineCard = ({ bgColor, chartData, footerData, icon, title, percentage }) => {
  const theme = useTheme();
  let footerHtml;

  if (footerData) {
    footerHtml = footerData.map((item, index) => {
      return (
        <Grid item key={index}>
          <Box mt={3} mb={3} p={1}>
            <Grid container direction="column" spacing={1} alignItems="center">
              <Typography variant="h4">{item.value}</Typography>
              <Typography variant="subtitle2" color="secondary">
                {item.label}
              </Typography>
            </Grid>
          </Box>
        </Grid>
      );
    });
  }

  return (
    <Card sx={{
      margin: "0.5rem",
      boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.3), 0px 8px 16px rgba(0, 0, 0, 0.3)", 
    }}>
      <CardContent sx={{ padding: 0, paddingBottom: '0 !important' }}>
        <Box color="#fff" bgcolor={bgColor ? bgColor : theme.palette.primary.main} p={3}>
          <Grid container direction="column" spacing={1}>
            <Grid item container justifyContent="space-between" alignItems="center">
              {title && (
                <Grid item>
                  <Typography variant="subtitle1" color="inherit">
                    {title}
                  </Typography>
                </Grid>
              )}
              <Grid item>
                <Grid container alignItems="center">
                  {icon && (
                    <Box component="span" mr={2}>
                      {icon}
                    </Box>
                  )}
                  {percentage && (
                    <Typography variant="subtitle1" color="inherit">
                      {percentage}
                    </Typography>
                  )}
                </Grid>
              </Grid>
            </Grid>
            {chartData && (
              <Grid item>
                <Chart {...chartData} />
              </Grid>
            )}
          </Grid>
        </Box>
        {footerData && (
          <Grid container justifyContent="space-around" alignItems="center">
            {footerHtml}
          </Grid>
        )}
      </CardContent>
    </Card>
  );
};



export default SalesLineCard;
