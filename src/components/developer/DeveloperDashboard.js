import React from "react";
import { Layout, Col, Row, Typography, Input, Space } from "antd";

const DeveloperDashboard = () => {
  return (
    <>
      <Row gutter={16}>
        <Col span={25}>
          <div className="layout-content"></div>
          <div>Developper Dashboard</div>
        </Col>
      </Row>
    </>
  );
};

export default DeveloperDashboard;
