import React, { useState } from "react";
import html2canvas from 'html2canvas';
import Papa from "papaparse";
import { MatrixSort } from "../MatrixReorderingAlgorithm/MatrixSort";
import { HeatMap } from "../HeatMap/HeatMap";
import { SettingsPainel } from "../SettingPainel/SettingsPainel";
import {
  HeatMapMatrixDiv, HeatMapMatrixTable, HeatMapMatrixTBody, HeatMatrixRow,
  HeatMatrixContent, HeatMapMatrixCategory, HeatMapContent,
  Table, VerticalTitle, HeatmapContent
} from "./HeatMapMatrix.css";

import { CircularProgressBar } from "../CircularProgressBar/CircularProgressBar";

export const HeatMapMatrix = (props) => {

  const file = props.csv;
  const [parsedData, setParsedData] = useState([]);
  const [tableRows, setTableRows] = useState([]);
  const [heatmapMatrix, setHeatmapMatriz] = useState([]);
  const [occurrences, setOccurrences] = useState([{ heatMap: '', line: '', column: '', name: '', occurrence: 0 }])

  const [hideLegend, setHideLegend] = useState(true);
  const [legendType, setLegendType] = useState("Local");

  const [horizontalLabel, setHorizonalLabel] = useState("showPartially");
  const [verticalLabel, setVerticalLabel] = useState("showPartially");

  const [firstVariableToSort, setFirstVariableToSort] = useState("");
  const [secondVariableToSort, setSecondVariableToSort] = useState("");
  const [sortedHeatMap, setSortedHeatMap] = useState([]);

  let isLoading = true;
  const handleDownloadImage = async () => {
    const element = document.getElementById('print'),
      canvas = await html2canvas(element),
      data = canvas.toDataURL('image/jpg'),
      link = document.createElement('a');

    link.href = data;
    link.download = 'downloaded-image.jpg';

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const hideVariableLabel = event => {
    if (event.target.checked) {
      setHideLegend(false);
      setTableRows([])
      HandleOnSubmit();
    } else {
      setHideLegend(true);
      setTableRows([]);
      HandleOnSubmit();
    }
  }

  const onChangeShowLegendTypes = (newValue) => {
    setLegendType(newValue);
    setTableRows([]);
    HandleOnSubmit();
  }

  const onChangeHorizontal = (newValue) => {
    setHorizonalLabel(newValue);
    setTableRows([]);
    HandleOnSubmit();
  };

  const onChangeVertical = (newValue) => {
    setVerticalLabel(newValue);
    setTableRows([]);
    HandleOnSubmit();
  };

  const onChangeFirstSortVar = (newValue) => { setFirstVariableToSort(newValue); }
  const onChangeSecondSortVar = (newValue) => { setSecondVariableToSort(newValue); }
  const onClickSortHeatmapMatrix = () => {
    const matrixSort = new MatrixSort(firstVariableToSort, secondVariableToSort, heatmapMatrix)
    const sortHeatmapMatrix = matrixSort.SortMatrix();
    setSortedHeatMap(sortHeatmapMatrix);

    setTableRows([]);
    HandleOnSubmit();
  }

  const HandleOnSubmit = () => {
    if (file !== undefined) {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: function (results) {
          const rowsArray = [];
          const valuesArray = [];

          results.data.map((d) => {
            rowsArray.push(Object.keys(d));
            valuesArray.push(Object.values(d));
          });
          //console.log("variáveis: ",rowsArray[0])
          //console.log("valores: ",results.data)
          setParsedData(results.data);
          setTableRows(rowsArray[0]);
          if (firstVariableToSort === "") {
            setFirstVariableToSort(rowsArray[0][0])
          }
          if (secondVariableToSort === "") {
            setSecondVariableToSort(rowsArray[0][0])
          }
          props.setVariables(rowsArray[0]);
          CreateHeatmapMatrix(tableRows, parsedData);
        },
      },

      );
    } else { return null; }
  }

  const CreateHeatmapMatrix = (variables, data) => {
    const firstVariable = variables;
    const secondVariable = variables;
    const dimensionSize = variables.length;
    const nHeatmaps = Math.pow(dimensionSize, 2)
    const heatMaps = [];

    for (let i = 0; i < dimensionSize; i++) {
      for (let j = 0; j < dimensionSize; j++) {
        const currentHeatmapName = firstVariable[i] + " x " + secondVariable[j];
        const firstVariableOccurrences = setHeatMapValues(data, firstVariable[i]);
        const secondVariableOccurrences = setHeatMapValues(data, secondVariable[j]);
        const series = defineSeriesNames(firstVariableOccurrences);
        const categories = defineCategoriesNames(secondVariableOccurrences);
        const heatMapOccurrences = CreateHeatmap(firstVariableOccurrences, secondVariableOccurrences);

        const heatmap = {
          heatmapName: currentHeatmapName,
          firstVariableName: firstVariable[i],
          secondVariableName: secondVariable[j],
          seriesNames: series,
          seriesNamesLabels: [],
          categoriesNames: categories,
          categoriesNamesLabels: [],
          occurrences: heatMapOccurrences,
        }
        if (heatMaps.length < nHeatmaps) heatMaps.push(heatmap);
      }
    }
    //console.log( heatMaps)
    for (let i = 0; i < heatMaps.length; i++) {
      heatMaps[i].seriesNamesLabels = FormatLabels(heatMaps[i], heatMaps, "seriesNames");
      heatMaps[i].categoriesNamesLabels = FormatLabels(heatMaps[i], heatMaps, "categoriesNames");
    }

    if (sortedHeatMap !== undefined) {
      if (sortedHeatMap.length > 0) {
        setHeatmapMatriz(sortedHeatMap);
      } else {
        setHeatmapMatriz(heatMaps);
      }
    } else {
      setHeatmapMatriz(heatMaps);
    }
  }

  const CreateHeatmap = (firstValues, secondValues) => {

    const seriesValues = firstValues;
    const categoriesValues = secondValues;

    const seriesNames = [... new Set(firstValues)];
    const categoriesNames = [... new Set(secondValues)];

    const heatmapOccurrences = [];
    const dimensionSize = seriesNames.length * categoriesNames.length;


    for (var i = 0; i < seriesNames.length; i++) {
      for (var j = 0; j < categoriesNames.length; j++) {
        const value = defineOccurrence(
          seriesValues,
          categoriesValues,
          categoriesNames[j],
          seriesNames[i])

        const occurrenceDetails = {
          occurrence: value,
          occurrenceName: categoriesNames[j] + " x " + seriesNames[i],
          category: categoriesNames[j],
          serie: seriesNames[i],
          line: i,
          column: j,
        }

        if (heatmapOccurrences.length < dimensionSize) heatmapOccurrences.push(occurrenceDetails);
      }
    }
    return heatmapOccurrences;
  }

  const defineOccurrence = (firstVariableValues, secondVariablesValues, category, serie) => {
    var ocurrence = 0;
    for (var i = 0; i < firstVariableValues.length; i++) {
      if ((secondVariablesValues[i] === category) && (firstVariableValues[i] === serie)) {
        ocurrence++;
      }
    }
    return ocurrence;
  }

  const defineSeriesNames = (heatmap) => {
    const seriesNames = [... new Set(heatmap)];
    return seriesNames;
  }

  const defineCategoriesNames = (heatmap) => {
    const categoriesNames = [...new Set(heatmap)];
    return categoriesNames;
  }

  const FormatLabels = (heatmap, heatmapMatrix, label) => {
    const labels = [];

    for (let i = 0; i < heatmapMatrix.length; i++) {
      labels.push(heatmapMatrix[i][label])
    }

    const sizes = [];

    for (let i = 0; i < labels.length; i++) {
      for (let j = 0; j < labels[i].length; j++) {
        sizes.push(labels[i][j].length);
      }

    }
    const maxSize = Math.max(...sizes);
    const newLabels = [];
    const str = " "

    for (let i = 0; i < heatmap[label].length; i++) {
      const dif = maxSize - heatmap[label][i].length;
      const currentLabel = heatmap[label][i] + str.repeat(dif);

      newLabels.push(currentLabel)
    }

    return newLabels;
  }

  const DefineScales = (heatmapMatrix, type, index = 0) => {
    switch (type) {
      case 'Global':
        const globalOccurrences = [];
        for (let i = 0; i < heatmapMatrix.length; i++) {
          for (let j = 0; j < heatmapMatrix[i].occurrences.length; j++) {
            globalOccurrences.push(heatmapMatrix[i].occurrences[j].occurrence);
          }
        }
        return globalOccurrences;
      case 'Local':
        const localOccurrences = [];
        const heatmap = heatmapMatrix[index];
        for (let i = 0; i < heatmap.occurrences.length; i++) {
          localOccurrences.push(heatmap.occurrences[i].occurrence);
        }
        return localOccurrences;
      case 'Lines':
        const lineOccurrences = [];
        const lineName = heatmapMatrix[index].firstVariableName;
        for (let i = 0; i < heatmapMatrix.length; i++) {
          for (let j = 0; j < heatmapMatrix[i].occurrences.length; j++) {
            if (heatmapMatrix[i].firstVariableName === lineName) {
              lineOccurrences.push(heatmapMatrix[i].occurrences[j].occurrence);
            }
          }
        }
        return lineOccurrences;
      case 'Columns':
        const columnOccurrences = [];
        const ColumnName = heatmapMatrix[index].secondVariableName;
        for (let i = 0; i < heatmapMatrix.length; i++) {
          for (let j = 0; j < heatmapMatrix[i].occurrences.length; j++) {
            if (heatmapMatrix[i].secondVariableName === ColumnName) {
              columnOccurrences.push(heatmapMatrix[i].occurrences[j].occurrence);
            }
          }
        }
        return columnOccurrences;
    }
  }

  function defineLabelsXY(lenght, axis) {
    const labelsVisibility = [];
    if (axis === 'X' || axis === 'x') {
      for (let i = 0; i < lenght; i++) {
        if (i === 0) {
          labelsVisibility.push(true)
        } else {
          labelsVisibility.push(false)
        }
      }
    }
    return labelsVisibility;
  }

  function setHeatMapValues(obj, columName) {
    let values = [];
    for (var i = 0; i < obj.length; i++) {
      values.push(obj[i][columName])
    }
    return values;
  };

  function DefineOccurrences(lenght, heatmapName) {
    for (let line = 0; line < lenght; line++) {
      for (let column = 0; column < lenght; column++) {
        const firstVariable = setHeatMapValues(parsedData, tableRows[line]);
        const secondVariable = setHeatMapValues(parsedData, tableRows[column]);
        DefineEachOccurrence(firstVariable, secondVariable, heatmapName)
      }
    }

    function DefineEachOccurrence(firstVariable, secondVariable, heatmapName) {
      const seriesValues = firstVariable;
      const categoriesValues = secondVariable;
      const seriesNames = [... new Set(firstVariable)];
      const categoriesNames = [... new Set(secondVariable)];

      for (var i = 0; i < seriesNames.length; i++) {
        for (var j = 0; j < categoriesNames.length; j++) {
          const value = defineOccurrence(
            seriesValues,
            categoriesValues,
            categoriesNames[j],
            seriesNames[i])
          const currentOccurrence = {
            heatMap: heatmapName,
            line: i,
            column: j,
            lineName: seriesNames[i],
            columName: categoriesNames[j],
            name: seriesNames[i] + " x " + categoriesNames[j],
            occurrence: value

          }
          function add(arr, name) {
            const { length } = arr;
            const id = length + 1;
            const found = arr.some(el => el.occurrenceName === name);
            if (!found) arr.push({
              id,
              heatmapName: currentOccurrence.heatMap,
              occurrenceName: currentOccurrence.name,
              line: currentOccurrence.line,
              column: currentOccurrence.column,
              lineName: currentOccurrence.lineName,
              columName: currentOccurrence.columName,
              occurrence: currentOccurrence.occurrence,
            });
            return arr;
          }
          add(occurrences, currentOccurrence.name)
        }
      }
    }

    function defineOccurrence(firstVariableValues, secondVariablesValues, category, serie) {
      var ocurrence = 0;
      for (var i = 0; i < firstVariableValues.length; i++) {
        if ((secondVariablesValues[i] === category) && (firstVariableValues[i] === serie)) {
          ocurrence++;
        }
      }
      return ocurrence;
    }
  };
  const labelsVisibilityX = defineLabelsXY(Math.pow(tableRows.length, 2), 'X')

  const HandleLoading = (value) => {
    isLoading = value;
  }

  const heatmapMatrixComponent = (file !== undefined) && (heatmapMatrix.length >= 1) &&
    <>
      <Table >
        <thead>
          <tr>
            {tableRows.map((rows, index) => {
              return <th key={index}>{rows}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          {
            tableRows.map((rows, index) => {
              return (
                <tr key={index}>
                  {tableRows.map((val, i) => {
                    const heatmap = tableRows[i] + " x " + tableRows[index];
                    { DefineOccurrences(tableRows.length, heatmap) }
                    const isNameVisible = i === 0 ? rows : "";
                    const labelVisibilityY = i === 0 ? true : false;
                    const c = index * tableRows.length + i;

                    const valuetoScale = [];
                    switch (legendType) {
                      case 'Global':
                        const globalValues = DefineScales(heatmapMatrix, 'Global')
                        valuetoScale.push(globalValues)
                        break;
                      case 'Columns':
                        const columnsValues = DefineScales(heatmapMatrix, 'Columns', c)
                        valuetoScale.push(columnsValues)
                        break;
                      case 'Lines':
                        const linesValues = DefineScales(heatmapMatrix, 'Lines', c)
                        valuetoScale.push(linesValues)
                        break;
                      default:
                        const localValues = DefineScales(heatmapMatrix, 'Local', c)
                        valuetoScale.push(localValues);
                    }
                    const sizes = [10];
                    for (let i = 0; i < heatmapMatrix.length; i++) {
                      const heatmap = heatmapMatrix[i];
                      const heatmapSize = heatmap.occurrences.length;
                      sizes.push(heatmapSize)
                    }
                    const size = Math.max(...sizes);
                   // console.log("aqui: ", c, "Tamanho: ",(Math.pow(tableRows.length,2) ))
                    if (c === (Math.pow(tableRows.length,2) - 1) ) {
                      HandleLoading(false)
                    }

                    return <HeatmapContent key={i}> <VerticalTitle>{isNameVisible}</VerticalTitle>
                      <div>
                        <HeatMap
                          currentHeatmap={heatmapMatrix[c]}

                          legendValues={valuetoScale}
                          hideLabel={hideLegend}

                          horizontalLabel={horizontalLabel}
                          verticalLabel={verticalLabel}

                          labelsVisibilityX={labelsVisibilityX[index]}
                          labelVisibilityY={labelVisibilityY}

                          size={size}
                        />
                      </div>
                    </HeatmapContent>;
                  })}
                </tr>
              );
            })}
        </tbody>
      </Table> </>

  const heatmapMatrixComponent1 = file === undefined ? null : heatmapMatrix.length < 1 ? null :
    <>
      <HeatMapMatrixTable >
        <thead>
          <HeatMatrixRow>
            {tableRows.map((rows, index) => {
              return <th key={index}>{rows}</th>;
            })}
          </HeatMatrixRow>
        </thead>
        <HeatMapMatrixTBody>
          {
            tableRows.map((rows, index) => {

              return (
                <tr key={index}>
                  {tableRows.map((val, i) => {
                    const heatmap = tableRows[i] + " x " + tableRows[index];
                    { DefineOccurrences(tableRows.length, heatmap) }
                    const isNameVisible = i === 0 ? rows : null;
                    const labelVisibilityY = i === 0 ? true : false;
                    const c = index * tableRows.length + i;

                    const valuetoScale = [];
                    switch (legendType) {
                      case 'Global':
                        const globalValues = DefineScales(heatmapMatrix, 'Global')
                        valuetoScale.push(globalValues)
                        break;
                      case 'Columns':
                        const columnsValues = DefineScales(heatmapMatrix, 'Columns', c)
                        valuetoScale.push(columnsValues)
                        break;
                      case 'Lines':
                        const linesValues = DefineScales(heatmapMatrix, 'Lines', c)
                        valuetoScale.push(linesValues)
                        break;
                      default:
                        const localValues = DefineScales(heatmapMatrix, 'Local', c)
                        valuetoScale.push(localValues);
                    }
                    const sizes = [10];
                    for (let i = 0; i < heatmapMatrix.length; i++) {
                      const heatmap = heatmapMatrix[i];
                      const heatmapSize = heatmap.occurrences.length;
                      sizes.push(heatmapSize)
                    }
                    const size = Math.max(...sizes);

                    return <HeatMatrixContent key={i}> <HeatMapMatrixCategory><b>{isNameVisible}</b></HeatMapMatrixCategory>
                      <HeatMapContent>
                        <HeatMap
                          currentHeatmap={heatmapMatrix[c]}

                          legendValues={valuetoScale}
                          hideLabel={hideLegend}

                          horizontalLabel={horizontalLabel}
                          verticalLabel={verticalLabel}

                          labelsVisibilityX={labelsVisibilityX[index]}
                          labelVisibilityY={labelVisibilityY}

                          //size = {tableRows.length}
                          size={size}
                        />
                      </HeatMapContent>
                    </HeatMatrixContent>;
                  })}
                </tr>
              );
            })}
        </HeatMapMatrixTBody>
      </HeatMapMatrixTable> </>

  const settingPainel =
    <SettingsPainel
      handleDownloadImage={handleDownloadImage}
      onChangeLegendOption={onChangeShowLegendTypes}

      legendVisibility={hideLegend}
      onChangeLegendVisibility={hideVariableLabel}


      onChangeHorizontalLabelsVisibility={onChangeHorizontal}
      onChangeVerticalLabelsVisibility={onChangeVertical}

      heatamapMatrixvariables={tableRows}

      firstVariableToSort={firstVariableToSort}
      secondVariableToSort={secondVariableToSort}
      onChangeFirstSortVar={onChangeFirstSortVar}
      onChangeSecondSortVar={onChangeSecondSortVar}
      onClickSortHeatmapMatrix={onClickSortHeatmapMatrix}
    />

  return (
    <>
      {<HeatMapMatrixDiv >
        {HandleOnSubmit()}
        {settingPainel}
        {!isLoading ?
          <div id="print">{heatmapMatrixComponent}</div>
          : <CircularProgressBar />}
      </HeatMapMatrixDiv>}
    </>
  );

}


