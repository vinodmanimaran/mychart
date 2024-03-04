import React from 'react';
import { useTheme } from '@mui/material/styles';
import { Box, Card, CardContent, Grid, Typography, Skeleton } from '@mui/material';

const ReportCard = ({ primary, secondary, iconPrimary, color, footerData, iconFooter, loading,setLoading }) => {
  const theme = useTheme();
  const IconPrimary = iconPrimary;
  const primaryIcon = iconPrimary ? <IconPrimary fontSize="large" /> : null;
  const IconFooter = iconFooter;
  const footerIcon = iconFooter ? <IconFooter /> : null;


  

  return (
    <Card
    sx={{
      margin: "0.5rem",
      boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.3), 0px 8px 16px rgba(0, 0, 0, 0.3)", 
    }}
  >      <CardContent>
        {loading ? (
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item >
              <Skeleton variant="text" width={150} height={40}  animation="wave" />
              <Skeleton variant="text" width={100} height={20}  animation="wave" />
            </Grid>
            <Grid item>
              <Skeleton variant="circular" width={40} height={40}  animation="wave" />
            </Grid>
          </Grid>
        ) : (
          
          <Grid container justifyContent="space-between" alignItems="center" >
            <Grid item>
              <Typography variant="h3" sx={{ color: color }}>
                {primary}
              </Typography>
              <Typography variant="subtitle1" sx={{ marginTop: '.5rem' }}>
                {secondary}
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="h2" sx={{ color: color }}>
                {primaryIcon}
              </Typography>
            </Grid>
          </Grid>
        )}
      </CardContent>
      <Box sx={{ background: color }}>
        <Grid
          container
          justifyContent="space-between"
          sx={{
            textAlign: 'center',
            padding: theme.spacing(1.2),
            pl: 2.5,
            pr: 2.5,
            color: theme.palette.common.white
          }}
        >
          <Grid item>
            {loading ? (
              <Skeleton variant="text" width={150} height={20}   animation="wave" />
            ) : (
              <Typography variant="body2">{footerData}</Typography>
            )}
          </Grid>
          <Grid item>
            {loading ? (
              <Skeleton variant="circular" width={30} height={30}  animation="wave" />
            ) : (
              <Typography variant="body2">{footerIcon}</Typography>
            )}
          </Grid>
        </Grid>
      </Box>
    </Card>
  );
};

export default ReportCard;
