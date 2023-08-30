import styled from "styled-components";

export const HeatMapSettingsPainel = styled.div`
    width:100%;
    height: 100%;
    margin: 0;
    display: flex;  
    flex-wrap: wrap;
    border-width: 1px;
    border-style: solid;
    border-color: black;
    background-color: white;
`;

export const SettingsPainelTitle = styled.b`
    text-align: center;
    display: block;
    margin-left: auto;
    margin-right: auto;
    margin-top: 0`;

export const SettingsPainelCheckBoxWrapper = styled.div`
    margin: 0;
    padding-bottom: 25%;
    padding-left: 10%;
    position: relative;
`;

export const SettingsPainelCheckBoxLabel = styled.label`
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

export const SettingsPainelCheckBox = styled.input`
  opacity: 0;
  z-index: 1;
  border-radius: 15px;
  width: 50px;
  height: 10%;
  &:checked + ${SettingsPainelCheckBoxLabel} {
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

export const SettingsPainelExportImage = styled.div`
  border-bottom: 1px solid;
  width: 100%;
`;

export const SettingsPainelExportImageButton = styled.button`
  margin-left: 43%;
  margin-right: auto;
  margin-bottom: 10px;
  margin-top: 10px;
  width: auto;
  background-color: DodgerBlue;
  border: none;
  color: white;
  padding: 12px 30px;
  cursor: pointer;
  font-size: 20px;
  border-radius: 25px;
  &:hover {
    background-color: RoyalBlue;
  }
`;

export const SettingsPainelLegend = styled.div`
  float:left;
  width: 35%;
  height: 100%;
  min-height: 180px;
  margin: 0;
  padding: 0;
  border-right: solid;
  border-width: 1px;
  border-color: black;
  display: flex;  
  flex-wrap: wrap;
`;

export const SettingsPainelLegendContainer = styled.div`
  max-width: 80%;
  min-width: 80%;
  padding: 2%;
  margin: 2%;
  display:inline-block;
`;

export const SettingsPainelLegendText = styled.div`
  padding-left: 5%;
  transform: translateY(-25%);
  display:inline-block;
`;

export const SettingsPainelLabels = styled.div`
  width: 30%;
  border-right: solid;
  border-width: 1px;
  border-color: black;
`;

export const SettingsPainelLabelsContainer = styled.div`
  width: 80%;
  padding-bottom: 7%;
  padding-left: 10%;
`;

export const SettingsPainelLabelsTitle = styled.b``;

export const SettingsPainelLabelsText = styled.b`
  color: white;
`;

export const SettingsPainelSort = styled.div`
  width: 34%;
`;

export const SettingsPainelSortVariableLabel = styled.div`
  width: 98%;
`;

export const SettingsPainelSortVariableTitle = styled.b`
  margin-left: 3%;
  width: 50%;
`;

export const SettingsPainelSortVariableList = styled.select`
  margin-left: 2%;
  margin-bottom: 2%;
  margin-top: 2%;
  width: 70%;
  padding-left: 10%
  padding-right: 10%
`;


