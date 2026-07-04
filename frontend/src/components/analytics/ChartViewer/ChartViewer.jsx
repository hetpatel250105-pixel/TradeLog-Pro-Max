import { useState, useEffect } from "react";

import "./ChartViewer.css";

import EquityChart from "../charts/EquityChart/EquityChart";
import WinRateChart from "../charts/WinRateChart/WinRateChart";
import MonthlyChart from "../charts/MonthlyChart/MonthlyChart";
import ProfitChart from "../charts/ProfitChart/ProfitChart";

function ChartViewer() {

    const charts = [

        {
            id: 0,
            title: "📈 Equity Curve",
            component: <EquityChart />
        },

        {
            id: 1,
            title: "🥧 Win / Loss Ratio",
            component: <WinRateChart />
        },

        {
            id: 2,
            title: "📊 Monthly Performance",
            component: <MonthlyChart />
        },

        {
            id: 3,
            title: "💰 Profit by Strategy",
            component: <ProfitChart />
        }

    ];

    const [currentChart, setCurrentChart] = useState(0);

    const [animate, setAnimate] = useState(true);

    const [paused, setPaused] = useState(false);

    function changeChart(index) {

        setAnimate(false);

        setTimeout(() => {

            setCurrentChart(index);

            setAnimate(true);

        }, 180);

    }

    function handleNext() {

        changeChart(

            currentChart === charts.length - 1

                ? 0

                : currentChart + 1

        );

    }

    function handlePrevious() {

        changeChart(

            currentChart === 0

                ? charts.length - 1

                : currentChart - 1

        );

    }

    function handleDropdown(event) {

        changeChart(Number(event.target.value));

    }

    useEffect(() => {

        if (paused) return;

        const timer = setInterval(() => {

            setAnimate(false);

            setTimeout(() => {

                setCurrentChart(previous =>

                    previous === charts.length - 1

                        ? 0

                        : previous + 1

                );

                setAnimate(true);

            }, 180);

        }, 5000);

        return () => clearInterval(timer);

    }, [paused, charts.length]);

    return (

        <div

            className="chart-viewer"

            onMouseEnter={() => setPaused(true)}

            onMouseLeave={() => setPaused(false)}

        >

            <div className="chart-viewer-header">

                <h2>

                    📊 Performance Analytics

                </h2>

                <div className="chart-controls">

                    <button

                        className="nav-button"

                        onClick={handlePrevious}

                    >

                        ◀

                    </button>

                    <select

                        value={currentChart}

                        onChange={handleDropdown}

                    >

                        {

                            charts.map(chart => (

                                <option

                                    key={chart.id}

                                    value={chart.id}

                                >

                                    {chart.title}

                                </option>

                            ))

                        }

                    </select>

                    <button

                        className="nav-button"

                        onClick={handleNext}

                    >

                        ▶

                    </button>

                </div>

            </div>

            <div

                className={

                    animate

                        ? "chart-content show"

                        : "chart-content hide"

                }

            >

                {

                    charts[currentChart].component

                }

            </div>

            <div className="chart-dots">

                {

                    charts.map((chart, index) => (

                        <span

                            key={chart.id}

                            className={

                                currentChart === index

                                    ? "chart-dot active"

                                    : "chart-dot"

                            }

                            onClick={() => changeChart(index)}

                        />

                    ))

                }

            </div>

        </div>

    );

}

export default ChartViewer;