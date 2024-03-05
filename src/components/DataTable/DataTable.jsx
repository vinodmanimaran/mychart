import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MUIDataTable from "mui-datatables";
import { Skeleton } from '@mui/material';
import './DataTable.css'
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

const API = import.meta.env.VITE_API || "http://localhost:4040";


const DataTable = () => {
  const classes = useStyles(); 

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    let isMounted = true; // Flag to track component mount status

    const fetchData = async () => {
      try {
        const response = await axios.get(`${API}/dashboard`, { withCredentials: true });
        const revenueChartData = response.data?.data || {};

        if (isMounted) {
          setData(generateRows(revenueChartData));
          setLoading(false);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();

    // Cleanup function to set isMounted to false when component unmounts
    return () => {
      isMounted = false;
    };
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
    { 
        name: 'Date', 
        label: 'Date',
        options: {
            customBodyRender: (value) => (
                <div className='data-cell'>
                    {value}
                </div>
            )
        }
    },
    { name: 'id', label: 'ID', options: {
      customBodyRender: (value) => (
        <div className='data-cell'>
            {value}
        </div>
    )
    } },
    { name: 'agentId', label: 'Agent ID', options: {
      customBodyRender: (value) => (
        <div className='data-cell'>
            {value}
        </div>
    )
    } },
    { name: 'Service', label: 'Service', options: {
      customBodyRender: (value) => (
        <div className='data-cell'>
            {value}
        </div>
    )
    } },
    { name: 'name', label: 'Name', options: {
      customBodyRender: (value) => (
        <div className='data-cell'>
            {value}
        </div>
    )
    } },
    { name: 'mobile', label: 'Mobile', options: {
      customBodyRender: (value) => (
        <div className='data-cell'>
            {value}
        </div>
    )
    } },
    { name: 'alternate_number', label: 'Alternate Number', options: {
      customBodyRender: (value) => (
        <div className='data-cell'>
            {value}
        </div>
    )
    } },
    { name: 'Place', label: 'Place', options: {} },
    { name: 'District', label: 'District', options: {
      customBodyRender: (value) => (
        <div className='data-cell'>
            {value}
        </div>
    )
    } },
    { name: 'amount', label: 'Loan Amount', options: {
      customBodyRender: (value) => (
        <div className='data-cell'>
            {value}
        </div>
    )
    } },
    { name: 'vehicle', label: 'Vehicle', options: {
      customBodyRender: (value) => (
        <div className='data-cell'>
            {value}
        </div>
    )
    } },
    { name: 'Experience', label: 'Experience', options: {
      customBodyRender: (value) => (
        <div className='data-cell'>
            {value}
        </div>
    )
    } },
    { name: 'insurance_type', label: 'Insurance Type', options: {
      customBodyRender: (value) => (
        <div className='data-cell'>
            {value}
        </div>
    )
    } },
    { name: 'Country', label: 'Country', options: {
      customBodyRender: (value) => (
        <div className='data-cell'>
            {value}
        </div>
    )
    } },
    { name: 'OtherVehicle', label: 'OtherVehicle', options: {
      customBodyRender: (value) => (
        <div className='data-cell'>
            {value}
        </div>
    )
    } },
    { name: 'purchaseOrSale', label: 'Purchase/Sale', options: {
      customBodyRender: (value) => (
        <div className='data-cell'>
            {value}
        </div>
    )
    } },
    { name: 'agreeOrCommercial', label: 'Agree/Commercial', options: {
      customBodyRender: (value) => (
        <div className='data-cell'>
            {value}
        </div>
    )
    } },
    { name: 'savingamount', label: 'Estimated Saving amount', options: {
      customBodyRender: (value) => (
        <div className='data-cell'>
            {value}
        </div>
    )
    } },
    { name: 'Estimated_value', label: 'Estimated_value', options: {
      customBodyRender: (value) => (
        <div className='data-cell'>
            {value}
        </div>

      )
    } },
    { 
        name: "loan_type", 
        label: "Loan Type", 
        options: {
            customBodyRender: (value) => (
                <div className='data-cell'>
                    {value}
                </div>
            )
        }
    }
];





  const options = {
    filter: true,
    selectableRows: 'none',
    responsive: 'standard',
    rowsPerPage: 5,
    rowsPerPageOptions: [5, 10, 20],
    serverSide: false,
    onColumnSortChange: (changedColumn, direction) => {
    }
  };

  return (
    <div className={`container ${classes.root}`} sx={{
      boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.3), 0px 8px 16px rgba(0, 0, 0, 0.3)", 
    }}>
      {loading ? (
        <>
          <Skeleton variant="text" height={50} animation="wave" />
          <Skeleton variant="rect" animation="wave" height={400} />
        </>
      ) : (
        <MUIDataTable
          title={"Leads Data"}
          data={data}
          columns={columns}
          options={options}
          
        />
      )}
    </div>
  );
};

export default DataTable;
