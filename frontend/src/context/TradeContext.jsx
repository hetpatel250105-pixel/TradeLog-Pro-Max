import { createContext, useContext, useEffect, useState } from "react";

import {
    getTrades,
    deleteTrade,
    updateTrade
} from "../services/tradeService";

const TradeContext = createContext();

export function TradeProvider({ children }) {

    const [trades, setTrades] = useState([]);

    async function loadTrades() {

        try {

            const userId = localStorage.getItem("user_id");

            console.log("User ID:", userId);

            if (!userId) {
                console.log("No user logged in.");
                setTrades([]);
                return;
            }

            const response = await getTrades(userId);

            console.log("API Response:", response);
            console.log("Is Array:", Array.isArray(response));

            setTrades(response);

            console.log("After setTrades:", response);

        } catch (error) {

            console.error("Load Trades Error:", error);

        }

    }

    async function removeTrade(id) {

        try {

            await deleteTrade(id);

            await loadTrades();

        } catch (error) {

            console.error(error);

        }

    }

    async function editTrade(id, tradeData) {

        try {

            await updateTrade(id, tradeData);

            await loadTrades();

        } catch (error) {

            console.error(error);

        }

    }

    useEffect(() => {

        loadTrades();

    }, []);

    // Dashboard Statistics

    const totalTrades = trades.length;

    const totalProfit = trades.reduce(
        (sum, trade) => sum + Number(trade.profit),
        0
    );

    const winningTrades = trades.filter(
        (trade) => trade.result === "Win"
    ).length;

    const winRate =
        totalTrades === 0
            ? 0
            : ((winningTrades / totalTrades) * 100).toFixed(1);

    const averageRR =
        totalTrades === 0
            ? 0
            : (
                trades.reduce(
                    (sum, trade) => sum + Number(trade.risk_reward),
                    0
                ) / totalTrades
            ).toFixed(2);

    return (

        <TradeContext.Provider
            value={{
                trades,
                loadTrades,
                removeTrade,
                editTrade,
                totalTrades,
                totalProfit,
                winRate,
                averageRR
            }}
        >

            {children}

        </TradeContext.Provider>

    );

}

export function useTrades() {

    return useContext(TradeContext);

}