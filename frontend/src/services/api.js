import axios from "axios";

// Create a reusable Axios instance
const api = axios.create({
    baseURL: "http://127.0.0.1:8000",
    headers: {
        "Content-Type": "application/json",
    },
});

// ===============================
// Authentication APIs
// ===============================

// Register User
export const registerUser = (userData) => {
    return api.post("/register", userData);
};

// Login User
export const loginUser = (userData) => {
    return api.post("/login", userData);
};

// ===============================
// Trade APIs
// ===============================

// Get All Trades
export const getTrades = (userId) => {
    return api.get(`/trades/${userId}`);
};

// Get Single Trade
export const getTrade = (tradeId) => {
    return api.get(`/trade/${tradeId}`);
};

export const createTrade = (tradeData) => {

    const userId = localStorage.getItem("user_id");

    return api.post("/trade", {
        ...tradeData,
        user_id: Number(userId),
    });

};
// Update Trade
export const updateTrade = (tradeId, tradeData) => {
    return api.put(`/trade/${tradeId}`, tradeData);
};

// Delete Trade
export const deleteTrade = (tradeId) => {
    return api.delete(`/trade/${tradeId}`);
};

// Export Axios Instance
export default api;