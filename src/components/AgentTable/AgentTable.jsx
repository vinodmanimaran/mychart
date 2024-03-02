import React, { useEffect, useState } from 'react';
import { Skeleton } from '@mui/material';
import MUIDataTable from "mui-datatables";
import axios from 'axios';
import { makeStyles } from '@mui/styles';
import './AgentTable.css'
import CreateAgent from '../CreateAgent.jsx/CreateAgent';

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

const API_URL = "https://backend-api-u4m5.onrender.com" || "http://localhost:4040";

const Agenttable = () => {
  const classes = useStyles(); // Correct usage of useStyles

  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [skeletonLoading, setSkeletonLoading] = useState(true); // State for skeleton loading

  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const response = await axios.get(`${API_URL}/agent/getallagent`);
        setAgents(response.data.agents);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching agents:', error);
        setError('Error fetching agents. Please try again later.');
        setLoading(false);
      }
    };

    fetchAgents();
  }, []);

  useEffect(() => {
    // Simulate a short delay for skeleton loading
    const skeletonTimer = setTimeout(() => {
      setSkeletonLoading(false);
    }, 1000);

    return () => clearTimeout(skeletonTimer);
  }, []);

  const columns = [
    {
      name:"agentId",
      label:"agentId"
    },
    {
      name: "name",
      label: "Name"
    },
    {
      name: "email",
      label: "Email"
    },
    {
      name: "contactNumber",
      label: "Contact Number"
    },
    {
      name: "location",
      label: "Location"
    },
    {
      name: "qrCode",
      label: "QR Code",
      options: {
        customBodyRender: (value) => (
          <img src={value} alt={`QR Code`} style={{ width: "80px" }} />
        )
      }
    }
  ];

  if (error) return <div>{error}</div>;

  const options = {
    filter: true,
    filterType: 'dropdown',
    responsive: 'vertical',
    pagination: true,
    selectableRows: 'none', 
    rowsPerPage: 10, 
    rowsPerPageOptions: [5, 10, 20],
    download: true,
    print: true,
    viewColumns: false,
    search: true,
    sort: true,
    serverSide: false,
  };

  return (
    <div className={`container ${classes.root}`}> {/* Correct usage of classes */}
      <div className="btn">
        <CreateAgent/>
      </div>
      <div> {/* Removed incorrect usage of useStyles */}
        {skeletonLoading ? (
          // Skeleton loading
          <div>
             <Skeleton variant="text" height={50} />
            <Skeleton animation="wave" height={50} />
            <Skeleton animation="wave" height={50} />
            <Skeleton animation="wave" height={50} />
            <Skeleton animation="wave" height={50} />
            <Skeleton animation="wave" height={50} />
          </div>
        ) : (
          // Actual data
          <MUIDataTable
            title={"Agents"}
            data={agents}
            columns={columns}
            options={options}
          />
        )}
      </div>
    </div>
  );
}

export default Agenttable;
