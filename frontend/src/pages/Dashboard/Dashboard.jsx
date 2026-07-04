import "./Dashboard.css";

import Layout from "../../components/layout/Layout/Layout";
import StatCard from "../../components/ui/StatCard/StatCard";
import TradeTable from "../../components/tables/TradeTable/TradeTable";
import TradeModal from "../../components/modals/TradeModal/TradeModal";

import ChartViewer from "../../components/analytics/ChartViewer/ChartViewer";

import { useTrades } from "../../context/TradeContext";
import { useModal } from "../../context/ModalContext";

function Dashboard() {

    const {

        trades,

        totalTrades,

        totalProfit,

        winRate,

        averageRR

    } = useTrades();

    const {

        open,

        editingTrade,

        closeModal

    } = useModal();

    return (

        <Layout>

            <div className="dashboard">

                <div className="stats-grid">

                    <StatCard
                        title="Total Profit"
                        value={totalProfit}
                        icon="💰"
                        color="green"
                    />

                    <StatCard
                        title="Win Rate"
                        value={winRate}
                        icon="🎯"
                        color="blue"
                    />

                    <StatCard
                        title="Risk Reward"
                        value={averageRR}
                        icon="⚖️"
                        color="orange"
                    />

                    <StatCard
                        title="Total Trades"
                        value={totalTrades}
                        icon="📝"
                        color="purple"
                    />

                </div>

                <div className="chart-section">

                    <ChartViewer />

                </div>

                <div className="table-section">

                    <TradeTable trades={trades} />

                </div>

            </div>

            <TradeModal

                open={open}

                editingTrade={editingTrade}

                onClose={closeModal}

            />

        </Layout>

    );

}

export default Dashboard;