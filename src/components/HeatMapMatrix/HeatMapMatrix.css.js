import styled from "styled-components";

import FormControlLabel from '@mui/material/FormControlLabel';

export const Table = styled.table`
  background-color: #d3d3d3;
`;

export const VerticalTitle = styled.div`
  font-weight: bold;
  width: 100%;
  height: 30px;
`;

export const HeatmapContent = styled.td`
  background-color: #d3d3d3;
`;

export const HeatMapMatrixDiv = styled.div`
    width: auto;
    height: auto;
    margin: 0;
    padding: 0;
    border: 0;
    border-style: solid;
    background-color: #d3d3d3;
`;

export const HeatMapMatrixCategory = styled.div`
    color: white;
    text-align: start;
    height: 10%;
    width: 20%;
    display: flex;
    justify-content: center;
    
`;

export const HeatMapMatrixTable = styled.table`
  width:auto;
  max-width:100%;
  background-color: #d3d3d3;
`;

export const HeatMapMatrixTBody = styled.tbody``;

export const HeatMatrixRow = styled.tr`
    color: white;
    background-color: #d3d3d3;
    text-align: center; 
    vertical-align: middle;
`;

export const HeatMatrixContent = styled.td`
    border: 1px;
    
    text-align: center; 
    vertical-align: middle;
    width:auto;

`;

export const HeatMapContent = styled.div`
    border: 10px;
    padding-left: 2%;
    width: auto;
    height: 100%;
`;

export const legendTypeButton = styled.input``

export const legendTypeButtonLabel = styled.label`
cursor: pointer;
text-indent: -9999px;
width: 200px;
height: 100px;
background: grey;
display: block;
border-radius: 100px;
position: relative;
`

export const CheckBoxWrapper = styled.div`
  margin: 0;
  padding-bottom: 25%;
  padding-left: 10%;
  position: relative;
`;

export const CheckBoxLabel = styled.label`
  position: absolute;
  top: 0;
  left: 0;
  width: 42px;
  height: 26px;
  border-radius: 15px;
  background: #bebebe;
  cursor: pointer;
  &::after {
    content: "";
    display: block;
    border-radius: 50%;
    width: 18px;
    height: 18px;
    margin: 3px;
    background: #ffffff;
    box-shadow: 1px 3px 3px 1px rgba(0, 0, 0, 0.2);
    transition: 0.2s;
  }
`;

export const CheckboxLabelTitle = styled.p`
  width: 100px;
`

export const CheckBox = styled.input`
  opacity: 0;
  z-index: 1;
  border-radius: 15px;
  width: 50px;
  height: 10%;
  &:checked + ${CheckBoxLabel} {
    background: #4fbe79;
    &::after {
      content: "";
      display: block;
      border-radius: 50%;
      width: 18px;
      height: 18px;
      margin-left: 21px;
      transition: 0.2s;
    }
  }
`;

export const HeatMapSettingsPainel = styled.div`
    width:100%;
    height: 100%;
    margin: 0;

    border-width: 1px;
    border-style: solid;
    border-color: black;
    background-color: red;
    display: flex;  
    flex-wrap: wrap;
`

export const HeatMapSettingsTitle = styled.b`
  text-align: center;
  display: block;
  margin-left: auto;
  margin-right: auto;
  margin-top: 0;
  margin-bottom: 0;

  padding:0;
`

export const HeatMapSettingsForm = styled(FormControlLabel)`
padding: 0;
margin: 0;
`;

export const HeatMapSettingsPainelLegend = styled.div`
    float:left;
    width: 35%;
    height: 100%;
    min-height: 180px;
    margin: 0;
    padding: 0;
    border-width: 1px;
    border-style: dashed;
    border-color: black;
    display: flex;  
    flex-wrap: wrap;
`

export const HeatMapSettingsPainelVariables = styled.div`
    float:left;
    width: 25%;

`

export const HeatMapSettingsPainelOptions = styled.div`
width: 80%;
padding-bottom: 7%;
padding-left: 10%;
`

export const HeatMapSettingsPainelReording = styled.div`
    float:left;
    width: 30%;
    height: 10%;
    border-width: 3px;
    border-style: dashed;
    border-color: black;

    display: flex;  
    flex-wrap: wrap;
`;

export const HeatMapScalesDiv = styled.div`
max-width: 80%;
min-width: 80%;
display:inline-block;
  padding: 2%;
  margin: 2%;
`;

export const HeatMapScalesDivText = styled.div`
  display:inline-block;
  padding-left: 5%;
  transform: translateY(-25%);
`;
