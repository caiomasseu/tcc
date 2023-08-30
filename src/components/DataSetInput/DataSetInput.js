import React, { useState } from "react";
import { useEffect } from "react";
import { FileInputContainer, FileInputSupportText, FileCustomDiv, FileInputButton, FileChooser } from './DataSetInput.css';
import Papa from "papaparse";

export function DataSetInput(props) {

    useEffect(() => {
        
    }, [props.file])
    const changeState=(event)=>{
        props.setFile(event.target.files[0]);
        
    }


    return (
        
        <FileInputContainer>
            <form>
                <FileInputSupportText> Choose a file in csv format to generate a HeatMapMatrix
                </FileInputSupportText>

                <FileCustomDiv >

                    <FileInputButton
              
                    >
                        Upload a file
                    </FileInputButton>
                    <FileChooser
                        type="file"
                        id={"csvFileInput"}
                        accept={".csv"}
                        onChange={changeState} 
                        />
                           
                </FileCustomDiv>
                </form>  
            
        </FileInputContainer>
    );
};
