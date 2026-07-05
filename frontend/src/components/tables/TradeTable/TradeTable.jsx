import "./TradeTable.css";

import { useModal } from "../../../context/ModalContext";
import { useTrades } from "../../../context/TradeContext";

function TradeTable({ trades }) {

    const { removeTrade } = useTrades();
    const { openEditTrade } = useModal();

    console.log("TradeTable trades:", trades);

    async function handleDelete(id) {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this trade?"
        );

        if (!confirmDelete) return;

        await removeTrade(id);
    }

    return (

        <div className="trade-table-container">

            <div className="trade-table-header">
                <h2>📋 Recent Trades</h2>
            </div>

            <table className="trade-table">

                <thead>
                    <tr>
                        <th>Pair</th>
                        <th>Type</th>
                        <th>Entry</th>
                        <th>Exit</th>
                        <th>SL</th>
                        <th>TP</th>
                        <th>Lot</th>
                        <th>RR</th>
                        <th>Profit</th>
                        <th>Result</th>
                        <th>Strategy</th>
                        <th>Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>

                    {trades.length === 0 ? (

                        <tr>
                            <td colSpan="13" className="empty-state">
                                No trades found.
                            </td>
                        </tr>

                    ) : (

                        trades.map((trade) => (

                            <tr key={trade.id}>

                                <td>{trade.pair}</td>
                                <td>{trade.trade_type}</td>
                                <td>{trade.entry}</td>
                                <td>{trade.exit}</td>
                                <td>{trade.stop_loss}</td>
                                <td>{trade.take_profit}</td>
                                <td>{trade.lot_size}</td>
                                <td>1 : {trade.risk_reward}</td>

                                <td className={Number(trade.profit) >= 0 ? "profit-positive" : "profit-negative"}>
                                    ${Number(trade.profit).toFixed(2)}
                                </td>

                                <td>
                                    <span className={`result ${trade.result.toLowerCase()}`}>
                                        {trade.result}
                                    </span>
                                </td>

                                <td>{trade.strategy}</td>
                                <td>{trade.trade_date}</td>

                                <td>

                                    <div className="trade-action">

                                        <button
                                            className="edit-btn"
                                            onClick={() => openEditTrade(trade)}
                                        >
                                            ✏️
                                        </button>

                                        <button
                                            className="delete-btn"
                                            onClick={() => handleDelete(trade.id)}
                                        >
                                            🗑
                                        </button>

                                    </div>

                                </td>

                            </tr>

                        ))

                    )}

                </tbody>

            </table>

        </div>

    );

}

export default TradeTable;