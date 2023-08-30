import React from 'react';
import styled from "styled-components";

export const FileInputContainer = styled.div`
    width: 100%;
    height: 10%;

    justify-content: center;
    align-content: center;
    display: flex;
    background-color: #00cccc;
    border-style: dashed;
`;

export const FileInputSupportText = styled.p`
    color: #ffffff;
    text-align: center;
`
export const FileCustomDiv = styled.div`
    position: relative;
    overflow: hidden;
    display: inline-block;
    
    justify-content: center;
    padding-left: 25%;
`;


export const FileInputButton = styled.button`
    border: 2px solid gray;
    color: gray;
    background-color: white;
    padding: 8px 20px;
    border-radius: 8px;
    font-size: 20px;
    font-weight: bold;

    justify-content: center;
`;

export const FileChooser = styled.input`
 font-size: 100px;
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0; 
`;