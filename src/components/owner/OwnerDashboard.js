import React from 'react'
import { Layout, Col, Row, Typography, Input, Space } from "antd";
import OwnerSidebar from './OwnerSidebar';
const OwnerDashboard = () => {
  return (
    <>
    <Row gutter={16}>
    <OwnerSidebar />
        <Col span={15}>
      <div className="layout-content"></div>
    <div>OwnerDashboard</div>
    </Col>
    </Row>
    </>
  )
}

export default OwnerDashboard
