export class Coefficient {
    constructor(matrixName, reorderableMatrix) {
      this._matrixName = matrixName;
      this._reorderableMatrix = reorderableMatrix;
    }
    getName(){
        return this._matrixName;
    }

    compareRows( matrix,  rowIndex1,  rowIndex2){
		let sum = 0;
			for(let j=0; j < matrix.getNumberOfColumns(); j++){	
             // sum += Math.pow((matrix.getValue(rowIndex1, j) - (matrix.getValue(rowIndex2, j))), 2);
			}
		let distance = Math.sqrt(sum);
		return distance;
    }

    compareColumns( matrix,  columnIndex1, columnIndex2){
		let sum = 0;
		for(let j= 0; j < matrix.getNumberOfRows(); j++){	
      
            //sum += Math.pow((matrix.getValue(j, columnIndex1) - (matrix.getValue(j, columnIndex2))), 2);
		}
		let distance = Math.sqrt(sum);
		return distance;
    }
  }