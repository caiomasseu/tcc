export class EuclideanDistance {
    constructor(matrixName, reorderableMatrix) {
      this._matrixName = matrixName;
      this._reorderableMatrix = reorderableMatrix;
    }
    getName(){
        return this._matrixName;
    }

    compareRows( matrix,  rowIndex1,  rowIndex2){
		let sum = 0;
    //console.log("Matrix: ", matrix, " rowIndex1: ", rowIndex1, " rowIndex2: ", rowIndex2)
			for(let j=0; j < matrix.getNumberOfColumns(); j++){	
        const value = Math.pow((matrix.getValue(rowIndex1, j) - (matrix.getValue(rowIndex2, j))), 2);
        if( (value>=0) || (value<=0)){
          sum += value;
        }
              // sum += Math.pow((matrix.getValue(rowIndex1, j) - (matrix.getValue(rowIndex2, j))), 2);
			}
		let distance = Math.sqrt(sum);
		return distance;
    }

    compareColumns( matrix,  columnIndex1, columnIndex2){
		let sum = 0;
		for(let j= 0; j < matrix.getNumberOfRows(); j++){	
          const columns = matrix.getNumberOfColumns();
          if((columnIndex1 < columns) && (columnIndex2 < columns)   ){
            const value = Math.pow((matrix.getValue(j, columnIndex1) - (matrix.getValue(j, columnIndex2))), 2);
            if( (value>=0) || (value<=0)){
              sum += value;
            }
          }

           
		}
		let distance = Math.sqrt(sum);
    
		return distance;
    }
  }