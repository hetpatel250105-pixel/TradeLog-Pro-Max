import { useEffect, useState } from "react";

import "./StatCard.css";

function StatCard({

    title,

    value,

    icon,

    color

}) {

    const [displayValue, setDisplayValue] = useState(0);

    useEffect(() => {

        const target = Number(value);

        if (isNaN(target)) {

            setDisplayValue(value);

            return;

        }

        let current = 0;

        const increment = target / 40;

        const timer = setInterval(() => {

            current += increment;

            if (current >= target) {

                current = target;

                clearInterval(timer);

            }

            setDisplayValue(current);

        }, 20);

        return () => clearInterval(timer);

    }, [value]);

    function formatValue() {

        if (title === "Total Profit") {

            return `$${Number(displayValue).toFixed(2)}`;

        }

        if (title === "Win Rate") {

            return `${Number(displayValue).toFixed(1)}%`;

        }

        if (title === "Risk Reward") {

            return `1 : ${Number(displayValue).toFixed(2)}`;

        }

        return Math.round(displayValue);

    }

    return (

        <div className={`stat-card ${color}`}>

            <div className="stat-icon">

                {icon}

            </div>

            <div>

                <h4>{title}</h4>

                <h2>{formatValue()}</h2>

            </div>

        </div>

    );

}

export default StatCard;