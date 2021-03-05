import React, { useState, useEffect, useRef } from 'react';
import { Tabs } from '@vgs/elemente';
import Layout from '../components/Layout';

const { TabPane } = Tabs;

const ViewTabs = () => {
  return (
    <Tabs defaultActiveKey="1" animated={false}>
      <TabPane tab="Create Fields" key="1">
        <Layout />
      </TabPane>
      <TabPane tab="Style Form" key="2">
        Content of Tab Pane 2
      </TabPane>
      <TabPane tab="Get Code" key="3">
        Content of Tab Pane 3
      </TabPane>
    </Tabs>
  )
}

export default ViewTabs;