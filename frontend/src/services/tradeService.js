import axios from "axios";

const API_URL = "http://127.0.0.1:8000";

// ======================
// Create Trade
// ======================
export const createTrade = async (trade) => {

    const response = await axios.post(
        `${API_URL}/trade`,
        trade
    );

    return response.data;

};

// ======================
// Get All Trades
// ======================
export const getTrades = async (userId) => {

    const response = await axios.get(
        `${API_URL}/trades/${userId}`
    );

    return response.data;

};

// ======================
// Get Single Trade
// ======================
export const getTrade = async (id) => {

    const response = await axios.get(
        `${API_URL}/trade/${id}`
    );

    return response.data;

};

// ======================
// Update Trade
// ======================
export const updateTrade = async (id, trade) => {

    const response = await axios.put(
        `${API_URL}/trade/${id}`,
        trade
    );

    return response.data;

};

// ======================
// Delete Trade
// ======================
export const deleteTrade = async (id) => {

    const response = await axios.delete(
        `${API_URL}/trade/${id}`
    );

    return response.data;

};