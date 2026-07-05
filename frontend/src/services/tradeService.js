import api from "./api";

// ======================
// Create Trade
// ======================

export const createTrade = async (trade) => {

    const response = await api.post(

        "/trade",

        trade

    );

    return response.data;

};

// ======================
// Get All Trades
// ======================

export const getTrades = async () => {

    const response = await api.get(

        "/trades"

    );

    return response.data;

};

// ======================
// Get Single Trade
// ======================

export const getTrade = async (id) => {

    const response = await api.get(

        `/trade/${id}`

    );

    return response.data;

};

// ======================
// Update Trade
// ======================

export const updateTrade = async (

    id,

    trade

) => {

    const response = await api.put(

        `/trade/${id}`,

        trade

    );

    return response.data;

};

// ======================
// Delete Trade
// ======================

export const deleteTrade = async (id) => {

    const response = await api.delete(

        `/trade/${id}`

    );

    return response.data;

};