import {

    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer,
    Legend

} from "recharts";

import { useTrades } from "../../../../context/TradeContext";

const COLORS = [

    "#22c55e",

    "#ef4444",

    "#facc15"

];

function WinRateChart() {

    const { trades } = useTrades();

    const winCount = trades.filter(

        (trade) => trade.result === "Win"

    ).length;

    const lossCount = trades.filter(

        (trade) => trade.result === "Loss"

    ).length;

    const breakevenCount = trades.filter(

        (trade) => trade.result === "Breakeven"

    ).length;

    const data = [

        {

            name: "Win",

            value: winCount

        },

        {

            name: "Loss",

            value: lossCount

        },

        {

            name: "Breakeven",

            value: breakevenCount

        }

    ];

    return (

        <ResponsiveContainer

            width="100%"

            height={350}

        >

            <PieChart>

                <Pie

                    data={data}

                    cx="50%"

                    cy="50%"

                    outerRadius={120}

                    dataKey="value"

                    label

                >

                    {

                        data.map(

                            (entry, index) => (

                                <Cell

                                    key={index}

                                    fill={COLORS[index]}

                                />

                            )

                        )

                    }

                </Pie>

                <Tooltip />

                <Legend />

            </PieChart>

        </ResponsiveContainer>

    );

}

export default WinRateChart;