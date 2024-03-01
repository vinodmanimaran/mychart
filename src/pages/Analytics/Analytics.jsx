import React from 'react'
import Layout from '../../components/Layout/Layout'
import DataTable from '../../DataTable/DataTable'
import './Analytics.css'

const Analytics = () => {
  return (
    <div>
      <Layout/>
       <div className="data-table">
       <DataTable/>

       </div>
    </div>
  )
}

export default Analytics