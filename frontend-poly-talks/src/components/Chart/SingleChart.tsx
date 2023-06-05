import React from 'react';
import {Bar, BarChart, CartesianGrid, Label, XAxis, YAxis} from 'recharts';

interface ColumnChartProps {
    data: { xValue: string; yValue: number }[];
}

const SingleChart: React.FC<ColumnChartProps> = ({data}) => {
    const yValues = data.map((item) => item.yValue);
    const maxTickCount = Math.max(...yValues);

    return (
        <BarChart width={320} height={170} data={data}>
            <CartesianGrid strokeDasharray="3 3"/>
            <XAxis dataKey="xValue">
                <Label value="Ocena" position="insideBottom" angle={0} offset={3}
                       style={{textAnchor: 'middle', dominantBaseline: 'central'}}/>
            </XAxis>
            <YAxis tickCount={maxTickCount}>
                <Label value="Ilość ocen" position="insideLeft" angle={-90} offset={20}
                       style={{textAnchor: 'middle', dominantBaseline: 'central'}}/>
            </YAxis>
            <Bar dataKey="yValue" fill="#CD3A3A"/>
        </BarChart>
    );
};

export default SingleChart;
