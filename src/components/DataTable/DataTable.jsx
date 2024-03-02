import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MUIDataTable from "mui-datatables";
import { Skeleton } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  root: {
    borderRadius: '5px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    '& .MuiPaper-root': {
      border: 'none',
    },
    '& .MuiToolbar-root': {
      borderBottom: '1px solid #e0e0e0',
    },
    '& .MuiTableHead-root': {
      backgroundColor: '#f5f5f5',
    },
    '& .MuiTableCell-root': {
      borderBottom: '1px solid #e0e0e0',
    },
  },
});

const DataTable = () => {
  const classes = useStyles(); // Correct usage of useStyles

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true); // State to control loading
  const API_URL = "https://backend-api-u4m5.onrender.com" || "http://localhost:4040";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}/dashboard`);
        const revenueChartData = response.data?.data || {};
        setData(generateRows(revenueChartData));
        setLoading(false); // Set loading to false when data is loaded
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const generateRows = (data) => {
    const rows = [];
    for (const serviceName in data) {
      if (Array.isArray(data[serviceName])) {
        data[serviceName].forEach(item => {
          const row = { id: rows.length + 1, Service: serviceName };
          for (const field in item) {
            if (!['_id', 'updatedAt', '__v'].includes(field)) {
              if (field === 'createdAt') {
                const createdAtDate = new Date(item[field]);
                row['Date'] = `${createdAtDate.getDate()}/${createdAtDate.getMonth() + 1}/${createdAtDate.getFullYear()}`;
              } else {
                row[field] = item[field] || '';
              }
            }
          }
          rows.push(row);
        });
      }
    }
    return rows;
  };

  const columns = [
    { name: 'Date', label: 'Date' },
    { name: 'id', label: 'ID' },
    { name: 'agentId', label: 'Agent ID' },
    { name: 'Service', label: 'Service' },
    { name: 'name', label: 'Name' },
    { name: 'mobile', label: 'Mobile' },
    { name: 'alternate_number', label: 'Alternate Number' },
    { name: 'place', label: 'Place' },
    { name: 'district', label: 'District' },
    { name: 'amount', label: 'Loan Amount' },
    { name: 'vehicle', label: 'Vehicle' },
    { name: 'Experience', label: 'Experience' },
    { name: 'insurance_type', label: 'Insurance Type' },
    { name: 'Country', label: 'Country' },
    { name: 'OtherVehicle', label: 'OtherVehicle' },
    { name: 'purchaseOrSale', label: 'Purchase/Sale' },
    { name: 'agreeOrCommercial', label: 'Agree/Commercial' },
    { name: 'Estimated_saving_amount', label: 'Estimated Saving amount' },
    { name: 'Estimated_value', label: 'Estimated_value' },
    { name: "loan_type", label: "Loan Type" }
  ];

  const options = {
    filter: true,
    selectableRows: 'none',
    responsive: 'standard',
    rowsPerPage: 5,
    rowsPerPageOptions: [5, 10, 20],
    serverSide: false,
    onColumnSortChange: (changedColumn, direction) => {
      console.log(`Sort changed: Column=${changedColumn}, Direction=${direction}`);
    }
  };

  return (
    <div className={`container ${classes.root}`} sx={{
      boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.3), 0px 8px 16px rgba(0, 0, 0, 0.3)", 
    }}>
      {loading ? (
        <>
          <Skeleton variant="text" height={50} animation="wave" />
          <Skeleton variant="rectangular" animation="wave" height={400} />
        </>
      ) : (
        <MUIDataTable
          title={"Dashboard Table"}
          data={data}
          columns={columns}
          options={options}
          
        />
      )}
    </div>
  );
};

export default DataTable;
