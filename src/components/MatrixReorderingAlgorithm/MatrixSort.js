import { MatrixReorderingAlgorithm } from "../MatrixReorderingAlgorithm/MatrixReorderingAlgorithm";

export class MatrixSort {
    constructor(firstSelected, secondSelected, heatmapMatrix) {
        this.firstSelected = firstSelected;
        this.secondSelected = secondSelected;
        this.heatmapMatrix = heatmapMatrix;
    }

    defineIndividualHeatmap(heatmapMatrix, heatmapName) {
        if (heatmapMatrix.length > 1) {
            const heatIndex = this.GetHeatmapIndex(heatmapName, heatmapMatrix);
            return heatmapMatrix[heatIndex].occurrences;
        }
    }

    defineMatrixSize(m, n) {
        return Array.from({
            length: m

        }, () => new Array(n).fill(0));
    };


 createMatrix(heatmapMatrix, nLines, nColumns) {
    let matrix = this.defineMatrixSize(nLines, nColumns);
    let aux = 0;
    for (let i = 0; i < nLines; i++) {
        for (let j = 0; j < nColumns; j++) {
            if ((heatmapMatrix[aux].line === i) && (heatmapMatrix[aux].column === j)) {
                matrix[nLines - (i + 1)][j] = heatmapMatrix[aux].occurrence;
            }
            aux++;
        }
    }
    return matrix;
}

 ReorderMatrix(originalMatrix, nLines, nColumns, rowsOrder, columnsOrder) {
    let newMatrix = this.defineMatrixSize(nLines, nColumns);
    for (let line = 0; line < nLines; line++) {
        for (let column = 0; column < nColumns; column++) {
            newMatrix[line][column] = originalMatrix[rowsOrder[line]][columnsOrder[column]];
        }
    }

    return newMatrix;
}

 ReorderMainHeatMap(index, heatmap, heatmapMatrix, rowsOrder, columnsOrder) {
    const categoriesNames = heatmap.categoriesNames;
    const seriesNames = heatmap.seriesNames;

    const newCategoriesNames = [];
    const newSeriesNames = [];

    for (let i = 0; i < categoriesNames.length; i++) {
        const index = columnsOrder.indexOf(i);
        newCategoriesNames[index] = categoriesNames[i];
    }


    for (let i = 0; i < seriesNames.length; i++) {
        const index = rowsOrder.indexOf(i);
        newSeriesNames[index] = seriesNames[i];
    }

    let response = heatmapMatrix;
    heatmap.categoriesNames = newCategoriesNames;
    heatmap.seriesNames = newSeriesNames
    heatmap.categoriesNamesLabels = this.FormatLabels(heatmapMatrix[index], heatmapMatrix, "categoriesNames");
    heatmap.seriesNamesLabels = this.FormatLabels(heatmapMatrix[index], heatmapMatrix, "seriesNames");
    response = this.ReorderHeatmapsLines(heatmapMatrix, index, heatmap.firstVariableName, rowsOrder);
    response = this.ReorderHeatmapsColumns(heatmapMatrix, index, heatmap.secondVariableName, columnsOrder);
    return response;
}

 ReorderHeatmapsLines(heatmapMatrix, currentHeatmapIndex, lineName, rowsOrder) {
    for (let i = 0; i < heatmapMatrix.length; i++) {
        if ((heatmapMatrix[i].firstVariableName === lineName) && (i !== currentHeatmapIndex)) {
            const heatmap = heatmapMatrix[i]

            const seriesNames = heatmap.seriesNames;
            const newSeriesNames = [];

            for (let i = 0; i < seriesNames.length; i++) {
                const index = rowsOrder.indexOf(i);
                newSeriesNames[index] = seriesNames[i];
            }

            heatmap.seriesNames = newSeriesNames;
            heatmap.seriesNamesLabels = this.FormatLabels(heatmapMatrix[i], heatmapMatrix, "seriesNames");

            heatmapMatrix[i] = heatmap;
        }

    }

    return heatmapMatrix;

}

 ReorderHeatmapsColumns(heatmapMatrix, currentHeatmapIndex, lineName, rowsOrder) {
    for (let i = 0; i < heatmapMatrix.length; i++) {
        if ((heatmapMatrix[i].secondVariableName === lineName) && (i !== currentHeatmapIndex)) {
            const heatmap = heatmapMatrix[i]

            const categoriesNames = heatmap.categoriesNames;
            const newCategoriesNames = [];

            for (let i = 0; i < categoriesNames.length; i++) {
                const index = rowsOrder.indexOf(i);
                newCategoriesNames[index] = categoriesNames[i];
            }

            heatmap.categoriesNames = newCategoriesNames;
            heatmap.categoriesNamesLabels = this.FormatLabels(heatmapMatrix[i], heatmapMatrix, "categoriesNames");

            heatmapMatrix[i] = heatmap;
        }

    }

    return heatmapMatrix;

}


 FormatLabels = (heatmap, heatmapMatrix, label) => {
    const labels = [];
    for (let i = 0; i < heatmapMatrix.length; i++) {
        const arr = heatmapMatrix[i][label];
        const newArr = arr.filter((a) => a);
        labels.push(newArr)
    }

    const sizes = [];

    for (let i = 0; i < labels.length; i++) {
        for (let j = 0; j < labels[i].length; j++) {
            const arr = labels[i][j];
            sizes.push(arr);
        }

    }
    const maxSize = Math.max(...sizes);
    const newLabels = [];
    const str = " "

    heatmap[label] = heatmap[label].filter((a) => a);
    for (let i = 0; i < heatmap[label].length; i++) {
        const dif = maxSize - heatmap[label][i].length;
        const currentLabel = heatmap[label][i] + str.repeat(dif);

        newLabels.push(currentLabel)
    }

    return newLabels;
}

 GetHeatmapIndex = (name, heatmapMatrix) => {
    let index;
    for (let i = 0; i < heatmapMatrix.length; i++) {
        if (heatmapMatrix[i].heatmapName === name) {
            index = i;
        }
    }
    return index;
}

 GetHeatmapNLines = (name, heatmapMatrix) => {
    let nLines;
    for (let i = 0; i < heatmapMatrix.length; i++) {
        if (heatmapMatrix[i].heatmapName === name) {
            nLines = heatmapMatrix[i].seriesNames.length;
        }
    }
    return nLines;
}

 GetHeatmapNColumns = (name, heatmapMatrix) => {
    let nColumns;
    for (let i = 0; i < heatmapMatrix.length; i++) {
        if (heatmapMatrix[i].heatmapName === name) {
            nColumns = heatmapMatrix[i].categoriesNames.length;
        }
    }
    return nColumns;
}


 SortMatrix() {
    const heatmapName = this.firstSelected + " x " + this.secondSelected;

    const matrizSort = this.defineIndividualHeatmap(this.heatmapMatrix, heatmapName);
    const nLines = this.GetHeatmapNLines(heatmapName, this.heatmapMatrix);
    const nColumns = this.GetHeatmapNColumns(heatmapName, this.heatmapMatrix);

    const matrixToSort = this.createMatrix(matrizSort, nLines, nColumns);

    const matrizReorder = new MatrixReorderingAlgorithm(matrixToSort);


    const newRows = matrizReorder.classicalMDSReorder(true);
    const newColumns = matrizReorder.classicalMDSReorder(false);

    const index = this.GetHeatmapIndex(heatmapName, this.heatmapMatrix)
    const newHeatMap = this.ReorderMainHeatMap(index, this.heatmapMatrix[index], this.heatmapMatrix, newRows, newColumns)

    //response.splice(0, response.length)
   // response.push(newHeatMap);

    return newHeatMap;
   // return response;
}


}