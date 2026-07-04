import "./MonthlyChart.css";

import {

    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer

} from "recharts";

import { useTrades } from "../../../../context/TradeContext";

function MonthlyChart() {

    const { trades } = useTrades();

    const monthlyData = {};

    trades.forEach((trade) => {

        const month = new Date(trade.trade_date).toLocaleString("default", {

            month: "short"

        });

        if (!monthlyData[month]) {

            monthlyData[month] = 0;

        }

        monthlyData[month] += Number(trade.profit);

    });

    const chartData = Object.keys(monthlyData).map((month) => ({

        month,

        profit: monthlyData[month]

    }));

    return (

        <div className="monthly-chart">

            <ResponsiveContainer

                width="100%"

                height={350}

            >

            <BarChart data={chartData}>

                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="month" />

                <YAxis />

                <Tooltip />

                <Bar

                    dataKey="profit"

                    fill="#6366f1"

                    radius={[8, 8, 0, 0]}

                />

            </BarChart>

        </ResponsiveContainer>

    </div>

);

}

export default MonthlyChart;