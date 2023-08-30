import styled from "styled-components";

export const HeatMapMatrixContainer = styled.div`
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    border: 0;
    border-style: solid;
    
`;

export const HeatMapMatrixBody = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    vertical-align:middle;
    margin: 0 auto;
    padding-top: 20%;
    color: red;
    font-size: 30px;
    font-weight: bold;
    background-color: white;
`;

export const HeatMapMatrixNav = styled.div`
    width: 30%;
    height: 100%;
    min-height: 1000px;
    float: left;
    margin: 0;
    padding: 0;
    display: flex;    
    border-style: solid;
`;

export const HeatMapMatrixNavContent = styled.div`
    width: 100%;
    box-sizing: border-box;
    display: block;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
`

