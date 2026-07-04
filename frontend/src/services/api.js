import axios from "axios";

// Create a reusable Axios instance
const api = axios.create({
    baseURL: "https://tradelog-pro-max.onrender.com",
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
export const getTrades = () => {
    return api.get("/trades");
};

// Get Single Trade
export const getTrade = (tradeId) => {
    return api.get(`/trade/${tradeId}`);
};

// Create Trade
export const createTrade = (tradeData) => {
    return api.post("/trade", tradeData);
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