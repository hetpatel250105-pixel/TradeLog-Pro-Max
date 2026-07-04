import {

    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer

} from "recharts";

import { useTrades } from "../../../../context/TradeContext";

function EquityChart() {

    const { trades } = useTrades();

    let balance = 0;

    const chartData = trades.map((trade, index) => {

        balance += Number(trade.profit);

        return {

            trade: index + 1,

            balance

        };

    });

    return (

        <ResponsiveContainer
            width="100%"
            height={350}
        >

            <LineChart
                data={chartData}
            >

                <CartesianGrid strokeDasharray="3 3" />

                <XAxis
                    dataKey="trade"
                />

                <YAxis />

                <Tooltip />

                <Line
                    type="monotone"
                    dataKey="balance"
                    stroke="#22c55e"
                    strokeWidth={3}
                />

            </LineChart>

        </ResponsiveContainer>

    );

}

export default EquityChart;