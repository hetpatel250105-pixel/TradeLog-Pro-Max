import { createContext, useContext, useState } from "react";

const ModalContext = createContext();

export function ModalProvider({ children }) {

    const [open, setOpen] = useState(false);

    const [editingTrade, setEditingTrade] = useState(null);

    function openAddTrade() {

        setEditingTrade(null);

        setOpen(true);

    }

    function openEditTrade(trade) {

        setEditingTrade(trade);

        setOpen(true);

    }

    function closeModal() {

        setEditingTrade(null);

        setOpen(false);

    }

    return (

        <ModalContext.Provider

            value={{

                open,

                editingTrade,

                openAddTrade,

                openEditTrade,

                closeModal

            }}

        >

            {children}

        </ModalContext.Provider>

    );

}

export function useModal() {

    return useContext(ModalContext);

}