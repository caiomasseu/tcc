import React, { Component } from "react";

export class SimilarityMatrix{

    constructor(r, originalMatrix,dimensionSize,nLines,nColunms, isRowSorting, coefficient) {
       // super(props);
       this.r = r;
       this.originalMatrix= originalMatrix;
       this.nLines = nLines;
       this.nColunms = nColunms;
       this.dimensionSize = dimensionSize;
       this.isRowSorting = isRowSorting;
       this.coefficient = coefficient;

      this.dimensionElementsIndex = this.defineElementIndex();
      this.matrix = this.defineMatrixSize(nLines, nColunms);
      this.defineMatrix();

      this.defineMatrixSize = this.defineMatrixSize.bind(this);

      this.getMatrixCopy = this.getMatrixCopy.bind(this);

      
      
    }

    setValue( i,  j,  value) {
        const dimensionElementsIndex = this.dimensionElementsIndex;
        const nLines = this.nLines;
        const nColumns = this.nColunms;
        if( (i < nLines) && (j < nColumns )){
            this.matrix[dimensionElementsIndex[i]][dimensionElementsIndex[j]] = value;
            
            
        }
        if( (j < nLines) && (i < nColumns )){
            this.matrix[dimensionElementsIndex[j]][dimensionElementsIndex[i]] = value;
        }
    
    }

    defineMatrixSize(m, n) {
        return Array.from({
          // generate array of length m
          length: m
          // inside map function generate array of size n
          // and fill it with `0`
        }, () => new Array(n).fill(0));
      };

    
    defineMatrix(){
      //  let matrix = this.defineMatrixSize(this.dimensionSize, this.dimensionSize);
        const r = this.r;
      //  const dimensionSize = this.dimensionSize;
        const nLines = this.nLines;
        const nColumns = this.nColunms;
        const isRowSimilarityMatrix = this.isRowSimilarityMatrix;
        const coefficient = this.coefficient;
        
        for (let i = 0; i < nLines; i++) {
            for (let j = 0; j < nColumns; j++) {
                if (isRowSimilarityMatrix) {
                   // console.log("linha: ", i, " colunas: ", j)
                   // console.log("aqui: ",coefficient.compareRows(r,i,j) )
                    this.setValue(i,j,coefficient.compareRows(r,i,j));
                } else {
                   //console.log("Linha: ", i, " Coluna: ", j)
                  // console.log("matrix: ", this.matrix)
                  // console.log("aqui: ",coefficient.compareColumns(r,i,j) )
                    
                    this.setValue(i,j,coefficient.compareColumns(r, i,j));
                }
            }
        }
    
    }
    defineElementIndex(){
        const size = this.nLines * this.nColunms;
       // let dimensionElementsIndex = new Array(this.dimensionSize);
       let dimensionElementsIndex = new Array(size);

        for (let i = 0; i < size; i++) {
            dimensionElementsIndex[i] = i;
        }

        return dimensionElementsIndex;

    }

    getMatrixCopy(){
        let copy =this.defineMatrixSize(this.nLines,this.nColunms);
        const dimensionElementsIndex = this.dimensionElementsIndex;
        //const dimensionSize = this.dimensionSize;
        const nLines = this.nLines;
        const nColumns = this.nColunms;
        const matrix = this.matrix;

        //console.log("matriz: ", matrix)
        for (let i = 0; i < nLines; i++) {
            for (let j = 0; j < nColumns; j++) {
              // console.log("aqui: ",  dimensionElementsIndex[i]);
               copy[i][j]=matrix[dimensionElementsIndex[i]][dimensionElementsIndex[j]];
               //console.log("linha: " + i + " coluna: " + j + " valor: " + copy[i][j]);
            }
        }
        return copy;  
    }
}//class
