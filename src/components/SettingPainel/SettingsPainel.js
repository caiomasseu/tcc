import React, { Component } from "react";
import SwitchSelector from "react-switch-selector";
import FormControlLabel from '@mui/material/FormControlLabel';
import {
    HeatMapSettingsPainel, SettingsPainelTitle, SettingsPainelCheckBoxWrapper, SettingsPainelCheckBox, SettingsPainelCheckBoxLabel,
    SettingsPainelExportImage,SettingsPainelExportImageButton,
    SettingsPainelLegend, SettingsPainelLegendContainer, SettingsPainelLegendText,
    SettingsPainelLabels, SettingsPainelLabelsContainer, SettingsPainelLabelsTitle, SettingsPainelLabelsText,
    SettingsPainelSort, SettingsPainelSortVariableLabel, SettingsPainelSortVariableTitle, SettingsPainelSortVariableList
} from './SettingsPainel.css';
import globalIcon from '../../assets/globalIcon.png';
import localIcon from '../../assets/localIcon.png';
import lineIcon from '../../assets/lineIcon.png';
import columnIcon from '../../assets/columnIcon.png';

export class SettingsPainel extends Component {
    constructor(props) {
        super(props);
        const onClickDownloadImage = this.props.handleDownloadImage;
        const onChangeLegendOption = this.props.onChangeLegendOption;
        const legendOptions = [
            {
                label: <SettingsPainelLegendContainer>
                    <img src={globalIcon} />
                    <SettingsPainelLegendText>Global</SettingsPainelLegendText>
                </SettingsPainelLegendContainer>,
                value: "Global",
                selectedBackgroundColor: "#a3a3a3",
            },
            {
                label: (
                    <SettingsPainelLegendContainer>
                        <img src={localIcon} />
                        <SettingsPainelLegendText>Local</SettingsPainelLegendText>
                    </SettingsPainelLegendContainer>
                ),
                value: "Local",
                selectedBackgroundColor: "#a3a3a3"
            },
            {
                label: <SettingsPainelLegendContainer>
                    <img src={lineIcon} />
                    <SettingsPainelLegendText>Lines</SettingsPainelLegendText>
                </SettingsPainelLegendContainer>,
                value: "Lines",
                imageIcon: require('../../assets/columnIcon.png'),
                selectedBackgroundColor: "#a3a3a3"
            },
            {
                label: <SettingsPainelLegendContainer>
                    <img src={columnIcon} />
                    <SettingsPainelLegendText>Columns</SettingsPainelLegendText>
                </SettingsPainelLegendContainer>,
                value: "Columns",
                imageIcon: require('../../assets/columnIcon.png'),
                selectedBackgroundColor: "#a3a3a3"
            }
        ];
        const initialSelectedIndexLegendOptions = legendOptions.findIndex(({ value }) => value === "Local");

        const legendVisibility = this.props.legendVisibility;
        const onChangeLegendVisibility = this.props.onChangeLegendVisibility;


        const horizontalLabelsOptions = [
            {
                label: <SettingsPainelLabelsText>Full</SettingsPainelLabelsText>,
                value: "showFull",
                selectedBackgroundColor: "#90ee90",
            },
            {
                label: <SettingsPainelLabelsText>Partially</SettingsPainelLabelsText>,
                value: "showPartially",
                selectedBackgroundColor: "#FFF9A6"
            },
            {
                label: <SettingsPainelLabelsText>Don't Show</SettingsPainelLabelsText>,
                value: "hide",
                selectedBackgroundColor: "#FF6666"
            }
        ];
        const initialSelectedIndexHorizontalLabels = horizontalLabelsOptions.findIndex(({ value }) => value === "showPartially");
        const onChangeHorizontalLabelsVisibility = this.props.onChangeHorizontalLabelsVisibility;

        const verticalLabelsOptions = [
            {
                label: <SettingsPainelLabelsText>Full</SettingsPainelLabelsText>,
                value: "showFull",
                selectedBackgroundColor: "#90ee90",
            },
            {
                label: <SettingsPainelLabelsText>Partially</SettingsPainelLabelsText>,
                value: "showPartially",
                selectedBackgroundColor: "#FFF9A6"
            },
            {
                label: <SettingsPainelLabelsText>Don't Show</SettingsPainelLabelsText>,
                value: "hide",
                selectedBackgroundColor: "#FF6666"
            }
        ];
        const initialSelectedIndexVerticalLabels = verticalLabelsOptions.findIndex(({ value }) => value === "showPartially");
        const onChangeVerticalLabelsVisibility = this.props.onChangeVerticalLabelsVisibility;

        const variableList = this.props.heatamapMatrixvariables;
        const onChangeFirstSortVar = this.props.onChangeFirstSortVar;
        const onChangeSecondSortVar = this.props.onChangeSecondSortVar;

        const onChangeSortMethod = (value) => {

        }

        const sortOptions = [
            {
                label: "Sort All",
                value: "Sort All Heatmaps",
                selectedBackgroundColor: "#a3a3a3",
            },
            {
                label: "Sort & Spread",
                value: "Sort Heatmap e Spread",
                selectedBackgroundColor: "#a3a3a3"
            },
            {
                label: "Sort Selected Vars",
                value: "Sort Selected Vars",
                selectedBackgroundColor: "#a3a3a3"
            },
            {
                label: "Sort All Vars",
                value: "Sort All Vars",
                selectedBackgroundColor: "#a3a3a3"
            }
        ];
        const initialSelectedIndexSortOptions = sortOptions.findIndex(({ value }) => value === "Sort Selected Vars");

        this.state = {
            onClickDownloadImage: onClickDownloadImage,
            legendOptions: legendOptions,
            initialSelectedIndexLegendOptions: initialSelectedIndexLegendOptions,
            onChangeLegendOption: onChangeLegendOption,

            legendVisibility: legendVisibility,
            onChangeLegendVisibility: onChangeLegendVisibility,


            horizontalLabelsOptions: horizontalLabelsOptions,
            initialSelectedIndexHorizontalLabels: initialSelectedIndexHorizontalLabels,
            onChangeHorizontalLabelsVisibility: onChangeHorizontalLabelsVisibility,

            verticalLabelsOptions: verticalLabelsOptions,
            initialSelectedIndexVerticalLabels: initialSelectedIndexVerticalLabels,
            onChangeVerticalLabelsVisibility: onChangeVerticalLabelsVisibility,


            variableList: variableList,
            onChangeFirstSortVar: onChangeFirstSortVar,
            onChangeSecondSortVar: onChangeSecondSortVar,

            sortOptions: sortOptions,
            initialSelectedIndexSortOptions: initialSelectedIndexSortOptions,
            onChangeSortMethod: onChangeSortMethod,
        }

    }
    componentDidUpdate(prevProps) {
        if (this.props.heatamapMatrixvariables !== prevProps.heatamapMatrixvariables) {
            this.setState({
                variableList: this.props.heatamapMatrixvariables,
            })
        }

    }

    render() {
        return (
            <>
            <HeatMapSettingsPainel>
                <SettingsPainelExportImage>
                    <SettingsPainelTitle>Export Heatmap Matrix</SettingsPainelTitle>
                    <React.Fragment>
                        <SettingsPainelExportImageButton onClick={this.state.onClickDownloadImage}>Export as JPEG</SettingsPainelExportImageButton>
                    </React.Fragment>
                </SettingsPainelExportImage>
                <SettingsPainelLegend>
                    <SettingsPainelTitle>Legends</SettingsPainelTitle>
                    <SwitchSelector
                        name={"legendOptions"}
                        options={this.state.legendOptions}
                        initialSelectedIndex={this.state.initialSelectedIndexLegendOptions}
                        onChange={this.state.onChangeLegendOption} />
                    <FormControlLabel
                        value="start"
                        control={<SettingsPainelCheckBoxWrapper>
                            <SettingsPainelCheckBox
                                id="legendVisibility"
                                type="checkbox"
                                value={this.state.legendVisibility}
                                onChange={this.state.onChangeLegendVisibility} />
                            <SettingsPainelCheckBoxLabel htmlFor="legendVisibility" />
                        </SettingsPainelCheckBoxWrapper>}
                        label="Hide Legends"
                        labelPlacement="top" />
                </SettingsPainelLegend>

                <SettingsPainelLabels>
                    <SettingsPainelTitle>Labels</SettingsPainelTitle>
                    <SettingsPainelLabelsContainer>
                        <SettingsPainelLabelsTitle>Display Vertical Labels</SettingsPainelLabelsTitle>
                        <SwitchSelector
                            name={"horizontalLabelsVisibility"}
                            options={this.state.horizontalLabelsOptions}
                            initialSelectedIndex={this.state.initialSelectedIndexHorizontalLabels}
                            onChange={this.state.onChangeHorizontalLabelsVisibility}
                            backgroundColor={"#c9c9c9"}
                            fontColor={"#000000"} />
                        <br />
                        <br />
                        <SettingsPainelLabelsTitle>Display Horizontal Labels</SettingsPainelLabelsTitle>
                        <SwitchSelector
                            name={"verticalLabelsVisibility"}
                            options={this.state.verticalLabelsOptions}
                            initialSelectedIndex={this.state.initialSelectedIndexVerticalLabels}
                            onChange={this.state.onChangeVerticalLabelsVisibility}
                            backgroundColor={"#c9c9c9"}
                            fontColor={"#fffffd"} />
                    </SettingsPainelLabelsContainer>
                </SettingsPainelLabels>
                <SettingsPainelSort>
                    <SettingsPainelTitle>Sort</SettingsPainelTitle>
                    <SettingsPainelSortVariableLabel>
                        <SettingsPainelSortVariableTitle>1º Variable</SettingsPainelSortVariableTitle>
                        <SettingsPainelSortVariableList
                            value={this.props.firstVariableToSort}
                            onChange={e => this.state.onChangeFirstSortVar(e.target.value)}>
                            {this.state.variableList.map((variable, index) => {
                                return <option value={variable} defaultValue="A" key={index}>{variable}</option>;
                            })}
                        </SettingsPainelSortVariableList>
                    </SettingsPainelSortVariableLabel>

                    <SettingsPainelSortVariableLabel>
                        <SettingsPainelSortVariableTitle>2º Variable</SettingsPainelSortVariableTitle>
                        <SettingsPainelSortVariableList
                            value={this.props.secondVariableToSort}
                            onChange={e => this.state.onChangeSecondSortVar(e.target.value)}>
                            {this.state.variableList.map((variable, index) => {
                                return <option value={variable} defaultValue="A" key={index}>{variable}</option>;
                            })}
                        </SettingsPainelSortVariableList>


                    </SettingsPainelSortVariableLabel>
                    <SettingsPainelSortVariableLabel>
                        <SwitchSelector
                            name={"SortMatrix"}
                            options={this.state.sortOptions}
                            initialSelectedIndex={this.state.initialSelectedIndexSortOptions}
                            onChange={this.state.onChangeSortOption}
                            backgroundColor={"#c9c9c9"}
                            fontColor={"#fffffd"} />
                    </SettingsPainelSortVariableLabel>
                    <SettingsPainelSortVariableLabel>
                        <SettingsPainelSortVariableList
                            value="Classical MDS"
                            onChange={
                                e => {
                                    const selectedValue = e.target.value;
                                    this.state.onChangeSortMethod(selectedValue);
                                }}
                        >
                            <option value="Hybrid Sort">Classical MDS</option>
                            <option value="Feature Vector Based Sort">Feature Vector Based Sort</option>
                            <option value="Hybrid Sort">Hybrid Sort</option>
                        </SettingsPainelSortVariableList>
                        <button
                            onClick={this.props.onClickSortHeatmapMatrix}>Ordenar</button>
                    </SettingsPainelSortVariableLabel>
                </SettingsPainelSort>
            </HeatMapSettingsPainel></>)
    }
}