
export class ReorderableMatrix{

    constructor(originalMatrix) {
       // super(props);
      this.originalMatrix= originalMatrix;
      this.numberOfRows = this.getNumberOfRows();
      this.numberOfColumns = this.getNumberOfColumns();
      this.rowLabels = new Array(this.numberOfRows);
      this.columnLabels = new Array(this.numberOfColumns);

      this.matrix = this.defineMatrixSize(this.numberOfRows,this.numberOfColumns );
      this.matrix = this.originalMatrix;

      this.rowIndex = new Array(this.numberOfRows);
      for (let i = 0; i < this.numberOfRows; i++) {
        this.rowIndex[i] = i;
        //console.log("row: ",this.rowIndex[i] )
    }

      this.columnIndex = new Array(this.numberOfColumns);;
      for (let i = 0; i < this.numberOfColumns; i++) {
        this.columnIndex[i] = i;
    }
      this.getNumberOfRows = this.getNumberOfRows.bind(this);
      this.getRowIndex = this.getRowIndex.bind(this);
      this.getColumnIndex = this.getColumnIndex.bind(this);
      this.getValue = this.getValue.bind(this);
      this.reorderColumns = this.reorderColumns.bind(this);
      
    }


    defineMatrixSize(m, n) {
        return Array.from({
          // generate array of length m
          length: m
          // inside map function generate array of size n
          // and fill it with `0`
        }, () => new Array(n).fill(0));
      };

    getNumberOfRows(){
        return this.originalMatrix.length;
    }

    getNumberOfColumns(){
        return this.originalMatrix[0].length;
    }

    getRowIndex(index) {
        return this.rowIndex[index];
        /*
        for(let row = 0; row < this.originalMatrix.length; row++ ){
            for(let column = 0; column < this.originalMatrix.length; column++ ){
                if(this.originalMatrix[row][column]===index){
                    return row;
                }
            }
        }*/
        
    }

    getColumnIndex(index) {
        return this.columnIndex[index];  
    }

    setRowLabels( row,  label) {
        this.rowLabels[this.getRowIndex(row)] = label;
    }

    setColumnLabels( column,  label) {
        this.columnLabels[this.getColumnIndex(column)] = label;
    }

    setValue( i,  j, value) {
        this.matrix[this.rowIndex[i]][this.columnIndex[j]] = value;
    }

    copy( matrix1) {
        const numberOfRows = this.numberOfRows;
        const numberOfColumns = this.numberOfColumns;
        const rowIndex = this.rowIndex;
        const columnIndex = this.columnIndex;

        let i, j;

        for (i = 0; i < numberOfRows; i++) {
            rowIndex[i] = matrix1.this.getRowIndex(i);
        }
        for (i = 0; i < numberOfRows; i++) {
            this.setRowLabels(i, matrix1.getRowLabels(i));
        }
        for (i = 0; i < numberOfColumns; i++) {
            columnIndex[i] = matrix1.getColumnIndex(i);
        }
        for (i = 0; i < numberOfColumns; i++) {
            this.setColumnLabels(i, matrix1.this.getColumnLabels(i));
        }

        for (i = 0; i < numberOfRows; i++) {
            for (j = 0; j < numberOfColumns; j++) {
                this.setValue(i, j, matrix1.getValue(i, j));
            }//for
        }//for

    }



    getValue(row, column) {
        const matrix = this.matrix;
        const rowIndex = this.rowIndex;
        const columnIndex = this.columnIndex;
        
        /*
        console.log("matrix: ", matrix,
        " rowIndex: ", rowIndex,
        " row: ", row,
        " columnIndex: ", columnIndex,
        " column: ", column,
        matrix[rowIndex[0]][columnIndex[0]]
        )*/
        if(rowIndex[row]!==undefined ){
            return (matrix[rowIndex[row]][columnIndex[column]]);
        }
        
        
    }

    reorderRows(newOrder) {
        this.rowIndex = newOrder;
        //console.log("nova: ",  this.rowIndex)
    }

    reorderColumns(newOrder) {
        this.columnIndex = newOrder;
        // TODO Must be improved to avoid impossible situations.
    }
}