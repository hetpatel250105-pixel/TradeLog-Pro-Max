import axios from "axios";

// ===============================
// Axios Instance
// ===============================

const api = axios.create({

    baseURL: "http://127.0.0.1:8000",

    headers: {

        "Content-Type": "application/json",

    },

});

// ===============================
// Automatically Attach JWT Token
// ===============================

api.interceptors.request.use(

    (config) => {

        const token = localStorage.getItem("access_token");

        if (token) {

            config.headers.Authorization = `Bearer ${token}`;

        }

        return config;

    },

    (error) => {

        return Promise.reject(error);

    }

);

// ===============================
// Authentication APIs
// ===============================

export const registerUser = (userData) => {

    return api.post("/register", userData);

};

export const loginUser = (userData) => {

    return api.post("/login", userData);

};

// ===============================
// Trade APIs
// ===============================

export const getTrades = () => {

    return api.get("/trades");

};

export const getTrade = (tradeId) => {

    return api.get(`/trade/${tradeId}`);

};

export const createTrade = (tradeData) => {

    return api.post("/trade", tradeData);

};

export const updateTrade = (tradeId, tradeData) => {

    return api.put(`/trade/${tradeId}`, tradeData);

};

export const deleteTrade = (tradeId) => {

    return api.delete(`/trade/${tradeId}`);

};

// ===============================
// Export Axios Instance
// ===============================

export default api;