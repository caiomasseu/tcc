import React, { Component } from "react";
import Chart from "react-apexcharts";
import { HeatmapDiv } from "./HeatMap.css";

export class HeatMap extends Component {

  constructor(props) {
    super(props);
    this.defineScales = this.defineScales.bind(this);
    this.foundOccurrence = this.foundOccurrence.bind(this)

    this.defineLabelVisibility = this.defineLabelVisibility.bind(this);
    this.createSerieData = this.createSerieData.bind(this);
    this.createDataData = this.createDataData.bind(this);

    const heatmap = this.props.currentHeatmap;
    const heatmapOccurrences = heatmap.occurrences;

    const scalesValues = this.props.legendValues[0];

    const hideLabel = this.props.hideLabel;
    const horizontalLabel = this.defineLabelVisibility(this.props.horizontalLabel, this.props.labelsVisibilityX);
    const verticalLabel = this.defineLabelVisibility(this.props.verticalLabel, this.props.labelVisibilityY)


    const seriesNames = heatmap.seriesNames;
    const seriesLabels = heatmap.seriesNamesLabels;
    const categoriesNames = heatmap.categoriesNames;
    const categoriesLabel = heatmap.categoriesNamesLabels;
    const scales = this.defineScales(scalesValues); 

    var seriesData = this.createSerieData(seriesLabels, seriesNames, verticalLabel,
      categoriesNames, heatmapOccurrences);

    this.state = {

      options: {

        legend: {
          show: hideLabel,
        },
        chart: {
          id: heatmap.heatmapName,

        },

        xaxis: {
          categories: categoriesLabel,
          labels: {
            show: horizontalLabel,
            rotate: 0,
            hideOverlappingLabels: false,
            maxWidth: 500,
            minwidth: 500,
            style: {
              colors: [],
              fontSize: '10px',
              fontFamily: 'Helvetica, Arial, sans-serif',
              fontWeight: 400,
              cssClass: 'apexcharts-xaxis-label',
          }
          },
          position: 'top',

        },
        yaxis:{
          hideOverlappingLabels: false,
          rotate: 0,
          showAlways: true,
          minWidth: "100000px",
          labels:{
            hideOverlappingLabels: false,
            style: {
              hideOverlappingLabels: false,
              minWidth: '100%',
              minHeight: '100%',
              colors: [],
              fontSize: '10px',
              fontFamily: 'Helvetica, Arial, sans-serif',
              
              
          }
          
          },
          position: 'left'
        },

        plotOptions: {
          hideOverlappingLabels: false,
          heatmap: {

            useFillColorAsStroke: true,

            colorScale: {
              dataLabels: {
                enabled: false
              },
              ranges: [
                {
                  from: scales[0],
                  to: scales[1],
                  name: 'Low',
                  color: '#ADD8E6',
                  foreColor: '#BBBBBB'
                },
                {
                  from: scales[2],
                  to: scales[3],
                  name: 'Medium',
                  color: '#128FD9'
                },
                {
                  from: scales[4],
                  to: scales[5],
                  name: 'High',
                  color: '#FFB200'
                },
                {
                  from: scales[6],
                  to: scales[7],
                  name: 'Extreme',
                  color: '#FF0000'
                }
              ]
            }

          }
        }

      },
      series: seriesData

    };
  }

  defineLabelVisibility(option, labelsVisibility) {
    switch (option) {
      case 'showFull':
        return true;
      case 'showPartially':
        return labelsVisibility;
      case 'hide':
        return false;
      default:
        return true;
    }
  }


  defineScales(values){
    //console.log("valores: ",values )
    const scales = []


    let maxScale = Math.max(...values);
    const max = Math.max(...values);
    const min = Math.min(...values);

    let isDivisible = false;

    while (isDivisible === false) {
      if (maxScale % 4 === 0) {
        isDivisible = true;
      } else {
        maxScale--;
      }
    }

    


    const swift = maxScale / 4;
    scales.push(0);
    scales.push(swift);
    scales.push(swift + 1);
    scales.push(swift * 2);
    scales.push((swift * 2) + 1);
    scales.push(swift * 3);
    scales.push((swift * 3) + 1);
    scales.push(max);

    return scales;

  }

  
  createSerieData(label,seriesNames, seriesNameVisibility, categoriesNames, heatmap) {
    const dataSeries = [];
    for (var i = 0; i < seriesNames.length; i++) {
      const str = " ";
      const obj = {
        name: label[i],
        name: seriesNameVisibility === true ? label[i] : str.repeat(label[i].length),
        data: this.createDataData(i, seriesNames, categoriesNames, heatmap),
      }
     // console.log(obj.name)
      dataSeries.push(obj);

    }
    return dataSeries;
  }

  foundOccurrence(heatmap, line, column) {

    let obj = heatmap.find(o => o.category === line && o.serie === column);

    return obj.occurrence;
  }

  createDataData(value, seriesNames, categoriesNames, heatmap) {
    const data = [];
    for (var i = 0; i < categoriesNames.length; i++) {
      var str1 = 'W';
      var str2 = i + 1;
      var x = `${str1} ${str2}`;


      const currentY = this.foundOccurrence(heatmap, categoriesNames[i],
        seriesNames[value]);
      const obj = {
        x: x,
        y: currentY,
      }
      data.push(obj);

    }
    return data;



  }

  createColorRange() {

  }

  render() {
    const heatmapWidth = this.props.size * 20;
    const heatmapHeight = this.props.size * 15;
    return (
      <HeatmapDiv>
        <Chart
          options={this.state.options}
          series={this.state.series}
          type="heatmap"
          width={heatmapWidth > 400 ? 400 : heatmapWidth}
          height={heatmapHeight > 300 ? 300 : heatmapHeight}

        />
      </HeatmapDiv>
    );
  }
}