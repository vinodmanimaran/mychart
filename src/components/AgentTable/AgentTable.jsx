import React, { useEffect, useState } from 'react';
import { Skeleton } from '@mui/material';
import MUIDataTable from "mui-datatables";
import axios from 'axios';
import './AgentTable.css'
import CreateAgent from '../CreateAgent.jsx/CreateAgent';
import { Download } from '@mui/icons-material';


const API = import.meta.env.VITE_API || "http://localhost:4040";

const Agenttable = () => {
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [skeletonLoading, setSkeletonLoading] = useState(true);
  const [agentNames, setAgentNames] = useState([]);


  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const response = await axios.get(`${API}/agent/getallagent`,{withCredentials:true});
        const names = response.data.agents.map(agent => agent.name);
        setAgentNames(names);

        console.log(names)

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


  const downloadQRCode = (url, agentName,agentID) => {
    const fileName = `${agentName}-${agentID}.png`;
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  

  useEffect(() => {
    const skeletonTimer = setTimeout(() => {
      setSkeletonLoading(false);
    }, 1000);
    return () => clearTimeout(skeletonTimer);
  }, []);

  const columns = [
    {
      name:"agentId",
      label:"Agent ID",
      options: {
        customBodyRender: (value) => (
          <div className='cell'>
            {value}
          </div>
        )
      }
    },
    {
      name: "name",
      label: "Name",
      options: {
        customBodyRender: (value) => (
          <div className='cell'>
            {value}
          </div>
        )
      }
    },
    {
      name: "email",
      label: "Email",
      options: {
        customBodyRender: (value) => (
          <div className='cell'>
            {value}
          </div>
        )
      }
    },
    {
      name: "contactNumber",
      label: "Contact Number",
      options: {
        customBodyRender: (value) => (
          <div className='cell'>
            {value}
          </div>
        )
      }
    },
    {
      name: "location",
      label: "Location",
      options: {
        customBodyRender: (value) => (
          <div className='cell'>
            {value}
          </div>
        )
      }
    },
    {
      name: "qrCode",
      label: "QR Code",
      options: {
        customBodyRender: (value, tableMeta) => (
          <div className='cell qr-details'>
            <img src={value} alt={`QR Code`} style={{ width: "80px" }} />
            <div className="download-icon" onClick={() => downloadQRCode(value,  agents[tableMeta.rowIndex].agentId,agents[tableMeta.rowIndex].name)}>
              <Download />
            </div>
          </div>
        )
    
      } 
    },
    {
      name: "Bank_Name",
      label: "Bank Name",
      options: {
        customBodyRender: (value) => (
          <div className='cell'>
          {value}
        </div>
        )
      }
    }, {
      name: "Aadhar_Number",
      label: "Aadhar",
      options: {
        customBodyRender: (value) => (
          <div className='cell'>
          {value}
        </div>
        )
      }
    }, {
      name: "Account_Number",
      label: "Account Number",
      options: {
        customBodyRender: (value) => (
          <div className='cell'>
            {value}
          </div>
        )
      }
    }, {
      name: "IFSC_Code",
      label: "IFSC Code",
      options: {
        customBodyRender: (value) => (
          <div className='cell'>
          {value}
        </div>
        )
      }
    },

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
    <div className=''>
      <div className="btn">
        <CreateAgent/>
      </div>
      <div className=''>
        {skeletonLoading ? (
          <div>
            <Skeleton variant="text" height={50} />
            <Skeleton animation="wave" height={50} />
            <Skeleton animation="wave" height={50} />
            <Skeleton animation="wave" height={50} />
            <Skeleton animation="wave" height={50} />
            <Skeleton animation="wave" height={50} />
          </div>
        ) : (
          
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
