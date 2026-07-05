import { useState, useEffect } from "react";
import "./TradeForm.css";

import { createTrade } from "../../../services/tradeService";
import { useTrades } from "../../../context/TradeContext";

function TradeForm({ editingTrade = null, onClose }) {

    const { editTrade, loadTrades } = useTrades();

    const emptyTrade = {

        pair: "",
        trade_type: "Buy",
        entry: "",
        exit: "",
        stop_loss: "",
        take_profit: "",
        lot_size: "",
        risk_reward: "",
        profit: "",
        result: "Win",
        strategy: "",
        notes: "",
        trade_date: new Date().toISOString().split("T")[0]

    };

    const [trade, setTrade] = useState(emptyTrade);

    useEffect(() => {

        if (editingTrade) {

            setTrade({

                pair: editingTrade.pair,
                trade_type: editingTrade.trade_type,
                entry: editingTrade.entry,
                exit: editingTrade.exit,
                stop_loss: editingTrade.stop_loss,
                take_profit: editingTrade.take_profit,
                lot_size: editingTrade.lot_size,
                risk_reward: editingTrade.risk_reward,
                profit: editingTrade.profit,
                result: editingTrade.result,
                strategy: editingTrade.strategy,
                notes: editingTrade.notes,
                trade_date: editingTrade.trade_date

            });

        } else {

            setTrade(emptyTrade);

        }

    }, [editingTrade]);

    function handleChange(event) {

        const { name, value } = event.target;

        setTrade((previousTrade) => ({

            ...previousTrade,

            [name]: value

        }));

    }

    async function handleSubmit(event) {

        event.preventDefault();

        try {

            const tradeData = {

                pair: trade.pair,

                trade_type: trade.trade_type,

                entry: Number(trade.entry),

                exit: Number(trade.exit),

                stop_loss: Number(trade.stop_loss),

                take_profit: Number(trade.take_profit),

                lot_size: Number(trade.lot_size),

                risk_reward: Number(trade.risk_reward),

                profit: Number(trade.profit),

                result: trade.result,

                strategy: trade.strategy,

                notes: trade.notes,

                trade_date: trade.trade_date

            };

            if (editingTrade) {

                await editTrade(editingTrade.id, tradeData);

                alert("Trade updated successfully!");

            } else {

                await createTrade(tradeData);

                await loadTrades();

                alert("Trade saved successfully!");

            }

            setTrade(emptyTrade);

            if (onClose) {

                onClose();

            }

        } catch (error) {

            console.error(error);

            alert("Failed to save trade.");

        }

    }

    return (

        <div className="trade-form-container">

            <h2>

                {editingTrade ? "Edit Trade" : "Add New Trade"}

            </h2>

            <form
                className="trade-form"
                onSubmit={handleSubmit}
            >

                <div className="form-group">

                    <label>Trading Pair</label>

                    <input
                        type="text"
                        name="pair"
                        placeholder="XAUUSD"
                        value={trade.pair}
                        onChange={handleChange}
                        required
                    />

                </div>

                <div className="form-group">

                    <label>Trade Type</label>

                    <select
                        name="trade_type"
                        value={trade.trade_type}
                        onChange={handleChange}
                    >

                        <option value="Buy">Buy</option>
                        <option value="Sell">Sell</option>

                    </select>

                </div>

                <div className="form-group">

                    <label>Entry Price</label>

                    <input
                        type="number"
                        step="0.01"
                        name="entry"
                        value={trade.entry}
                        onChange={handleChange}
                        required
                    />

                </div>

                <div className="form-group">

                    <label>Exit Price</label>

                    <input
                        type="number"
                        step="0.01"
                        name="exit"
                        value={trade.exit}
                        onChange={handleChange}
                        required
                    />

                </div>

                <div className="form-group">

                    <label>Stop Loss</label>

                    <input
                        type="number"
                        step="0.01"
                        name="stop_loss"
                        value={trade.stop_loss}
                        onChange={handleChange}
                        required
                    />

                </div>

                <div className="form-group">

                    <label>Take Profit</label>

                    <input
                        type="number"
                        step="0.01"
                        name="take_profit"
                        value={trade.take_profit}
                        onChange={handleChange}
                        required
                    />

                </div>

                <div className="form-group">

                    <label>Lot Size</label>

                    <input
                        type="number"
                        step="0.01"
                        name="lot_size"
                        value={trade.lot_size}
                        onChange={handleChange}
                        required
                    />

                </div>

                <div className="form-group">

                    <label>Risk Reward</label>

                    <input
                        type="number"
                        step="0.1"
                        name="risk_reward"
                        value={trade.risk_reward}
                        onChange={handleChange}
                        required
                    />

                </div>

                <div className="form-group">

                    <label>Profit ($)</label>

                    <input
                        type="number"
                        step="0.01"
                        name="profit"
                        value={trade.profit}
                        onChange={handleChange}
                        required
                    />

                </div>

                <div className="form-group">

                    <label>Result</label>

                    <select
                        name="result"
                        value={trade.result}
                        onChange={handleChange}
                    >

                        <option value="Win">Win</option>
                        <option value="Loss">Loss</option>
                        <option value="Breakeven">Breakeven</option>

                    </select>

                </div>

                <div className="form-group">

                    <label>Strategy</label>

                    <input
                        type="text"
                        name="strategy"
                        value={trade.strategy}
                        onChange={handleChange}
                        required
                    />

                </div>

                <div className="form-group">

                    <label>Trade Date</label>

                    <input
                        type="date"
                        name="trade_date"
                        value={trade.trade_date}
                        onChange={handleChange}
                        required
                    />

                </div>

                <div className="form-group full-width">

                    <label>Trade Notes</label>

                    <textarea
                        rows="5"
                        name="notes"
                        value={trade.notes}
                        onChange={handleChange}
                    />

                </div>

                <button
                    type="submit"
                    className="save-btn"
                >

                    {editingTrade ? "Update Trade" : "Save Trade"}

                </button>

            </form>

        </div>

    );

}

export default TradeForm;