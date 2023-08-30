import {EuclideanDistance} from "../../utils/EuclideanDistance";
import {SimilarityMatrix} from "../../utils/SimilarityMatrix";
import {Pair} from "../../utils/Pair";
import {ReorderableMatrix} from"../../utils/ReorderableMatrix";

export class MatrixReorderingAlgorithm{
    constructor(originalMatrix) {
        this.originalMatrix = new ReorderableMatrix(originalMatrix);
        this.classicalMDSReorder = this.classicalMDSReorder.bind(this);
        this.solveMDS = this.solveMDS.bind(this);
    }

    classicalMDSReorder(isRowSorting){
        const coef = new EuclideanDistance();
        const dissimilarityMatrix = new SimilarityMatrix(this.originalMatrix,
            this.originalMatrix, this.originalMatrix.numberOfColumns,
            this.originalMatrix.numberOfRows,
            this.originalMatrix.numberOfColumns,
             isRowSorting, coef);
       const output=this.solveMDS(dissimilarityMatrix.getMatrixCopy());
       const list = [];
   
       const len = isRowSorting===true? this.originalMatrix.getNumberOfRows(): this.originalMatrix.getNumberOfColumns();
       for(let i=0; i<len; i++) { 
            if(this.originalMatrix.getNumberOfRows()>2){
                list.push(new Pair(i,output[2][i]));
            }else{
                list.push(new Pair(i,output[1][i]));
            }
	    }
    
        list.sort(function(a,b) {
            return a.value < b.value ? -1 : a.value > b.value ? 1 : 0;
        });
        
        
        let i=0;
 
        if (isRowSorting) {
            const size = this.originalMatrix.getNumberOfRows();
            let newOrder = new Array(size);
            for(let p =0; p < size; p++){
                if(list[p]!==undefined){
                    newOrder[i]=this.originalMatrix.getRowIndex(list[p].index);
                }
                
                i++;
            }
            this.originalMatrix.reorderRows(newOrder);
            return newOrder;
            
        } 
        else {
            const size = this.originalMatrix.getNumberOfColumns();
            let newOrder = new Array(size);
            for(let p = 0; p < size; p++){
                newOrder[i]=this.originalMatrix.getColumnIndex(list[p].index);
                i++;
            }
            this.originalMatrix.reorderColumns(newOrder);
            return newOrder;
        }
       
    }
    solveMDS(array){
        const solveMDS = array.slice();
        return solveMDS;
    }
}