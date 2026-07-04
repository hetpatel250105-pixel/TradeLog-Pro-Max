import "./ProfitChart.css";

import {

    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer,
    Legend

} from "recharts";

import { useTrades } from "../../../../context/TradeContext";

function ProfitChart() {

    const { trades } = useTrades();

    const strategyData = {};

    trades.forEach((trade) => {

        if (!strategyData[trade.strategy]) {

            strategyData[trade.strategy] = 0;

        }

        strategyData[trade.strategy] += Number(trade.profit);

    });

    const chartData = Object.keys(strategyData).map((strategy) => ({

        name: strategy,

        value: strategyData[strategy]

    }));

    const colors = [

        "#6366f1",

        "#22c55e",

        "#f59e0b",

        "#ef4444",

        "#06b6d4",

        "#a855f7"

    ];

    return (

        <div className="profit-chart">

            <ResponsiveContainer

                width="100%"

                height={350}

            >

                <PieChart>

                    <Pie

                        data={chartData}

                        dataKey="value"

                        nameKey="name"

                        outerRadius={120}

                        label

                    >

                        {

                            chartData.map((entry, index) => (

                                <Cell

                                    key={index}

                                    fill={colors[index % colors.length]}

                                />

                            ))

                        }

                    </Pie>

                    <Tooltip />

                    <Legend />

                </PieChart>

            </ResponsiveContainer>

        </div>

    );

}

export default ProfitChart;