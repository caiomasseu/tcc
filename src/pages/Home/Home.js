import React, { useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { DataSetInput } from "../../components/DataSetInput/DataSetInput";
import { HeatMapMatrix } from "../../components/HeatMapMatrix/HeatMapMatrix";
import { CSVReader } from "../../components/CSVReader/CSVReader";
import {HeatMapMatrixBody, HeatMapMatrixContainer } from './Home.css'
import {Header} from "../../components/Header/Header";

export function HomePage() {
  const [file, setFile] = useState();
  const [variables, setVariables] = useState([]);
  let component = file !== undefined ? <Tabs>
    <TabList>
      <Tab>HeatMap Matrix</Tab>
      <Tab>Original Data</Tab>
    </TabList>

    <TabPanel>
      <HeatMapMatrix csv={file} variables={variables} setVariables={setVariables} />
    </TabPanel>
    <TabPanel>
      <CSVReader csv={file} />
    </TabPanel>
  </Tabs> : <HeatMapMatrixBody>No file read yet...</HeatMapMatrixBody>
  return (
    <HeatMapMatrixContainer>
      <Header/>
      {
        <DataSetInput setFile={setFile} file={file} />
      }
      {component}
    </HeatMapMatrixContainer>
  );
};