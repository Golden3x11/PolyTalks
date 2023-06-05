import React from 'react';
import {RatingDto} from "../../dto/rating.dto";
import SingleChart from "./SingleChart";

interface MultiColumnChartProps {
    data: RatingDto[];
}

const MultiColumnChart: React.FC<MultiColumnChartProps> = ({data}) => {
    const getChartData = () => {
        const difficultyCounts: { [key: number]: number } = {1: 0, 2: 0, 3: 0, 4: 0, 5: 0};
        const knowledgeCounts: { [key: number]: number } = {1: 0, 2: 0, 3: 0, 4: 0, 5: 0};
        const communicationCounts: { [key: number]: number } = {1: 0, 2: 0, 3: 0, 4: 0, 5: 0};
        const friendlinessCounts: { [key: number]: number } = {1: 0, 2: 0, 3: 0, 4: 0, 5: 0};

        data.forEach((rating) => {
            const {rating_difficulty, rating_knowledge, rating_communication, rating_friendliness} = rating;

            // Zwiększanie zliczeń dla danego ratingu i danej wartości klucza
            difficultyCounts[rating_difficulty]++;
            knowledgeCounts[rating_knowledge]++;
            communicationCounts[rating_communication]++;
            friendlinessCounts[rating_friendliness]++;
        });

        const chartDataDifficulty = Object.entries(difficultyCounts).map(([xValue, yValue]) => ({
            xValue,
            yValue,
        }));

        const chartDataKnowledge = Object.entries(knowledgeCounts).map(([xValue, yValue]) => ({
            xValue,
            yValue,
        }));

        const chartDataCommunication = Object.entries(communicationCounts).map(([xValue, yValue]) => ({
            xValue,
            yValue,
        }));

        const chartDataFriendliness = Object.entries(friendlinessCounts).map(([xValue, yValue]) => ({
            xValue,
            yValue,
        }));

        return {
            chartDataDifficulty,
            chartDataKnowledge,
            chartDataCommunication,
            chartDataFriendliness,
        };
    };

    const calculateAverage = (counts: { [key: number]: number }) => {
        let sum = 0;
        let total = 0;

        for (const key in counts) {
            const count = counts[key];
            sum += Number(key) * count;
            total += count;
        }

        return total > 0 ? sum / total : 0;
    };

    const chartLabels = ['Trudność zdania', 'Wiedza', 'Komunikatywność', 'Podejście do studenta'];

    const {chartDataDifficulty, chartDataKnowledge, chartDataCommunication, chartDataFriendliness} = getChartData();

    const difficultyAverage = calculateAverage(chartDataDifficulty.reduce((acc, cur) => {
        acc[Number(cur.xValue)] = cur.yValue;
        return acc;
    }, {} as { [key: number]: number }));

    const knowledgeAverage = calculateAverage(chartDataKnowledge.reduce((acc, cur) => {
        acc[Number(cur.xValue)] = cur.yValue;
        return acc;
    }, {} as { [key: number]: number }));

    const communicationAverage = calculateAverage(chartDataCommunication.reduce((acc, cur) => {
        acc[Number(cur.xValue)] = cur.yValue;
        return acc;
    }, {} as { [key: number]: number }));

    const friendlinessAverage = calculateAverage(chartDataFriendliness.reduce((acc, cur) => {
        acc[Number(cur.xValue)] = cur.yValue;
        return acc;
    }, {} as { [key: number]: number }));

    return (
        <div>
            <h2 style={{marginBottom: '0'}}>Oceny prowadzącego</h2>
            <div className="multi-column-chart-container">
                <div className="column-chart-wrapper">
                    <h3>{chartLabels[0]}</h3>
                    <SingleChart data={chartDataDifficulty}/>
                    <h4 style={{marginBottom: '0'}}>Średnia ocena: {difficultyAverage.toFixed(2)}</h4>
                </div>
                <div className="column-chart-wrapper">
                    <h3>{chartLabels[1]}</h3>
                    <SingleChart data={chartDataKnowledge}/>
                    <h4 style={{marginBottom: '0'}}>Średnia ocena: {knowledgeAverage.toFixed(2)}</h4>
                </div>
                <div className="column-chart-wrapper">
                    <h3>{chartLabels[2]}</h3>
                    <SingleChart data={chartDataCommunication}/>
                    <h4 style={{marginBottom: '0'}}>Średnia ocena: {communicationAverage.toFixed(2)}</h4>
                </div>
                <div className="column-chart-wrapper">
                    <h3>{chartLabels[3]}</h3>
                    <SingleChart data={chartDataFriendliness}/>
                    <h4 style={{marginBottom: '0'}}>Średnia ocena: {friendlinessAverage.toFixed(2)}</h4>
                </div>
            </div>
            <style>
                {`
                .multi-column-chart-container {
                  display: flex;
                }
        
                .column-chart-wrapper {
                  flex: 1;
                  margin-right: 10px;
                }
        
                .column-chart-wrapper:last-child {
                  margin-right: 0;
                }
              `}
            </style>
        </div>
    );
};

export default MultiColumnChart;
