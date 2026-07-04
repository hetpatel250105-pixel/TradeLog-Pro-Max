import "./TradeModal.css";

import TradeForm from "../../forms/TradeForm/TradeForm";

function TradeModal({

    open,

    onClose,

    editingTrade = null

}) {

    if (!open) return null;

    return (

        <div className="modal-overlay">

            <div className="modal-content">

                <button

                    className="close-button"

                    onClick={onClose}

                >

                    ✕

                </button>

                <TradeForm

                    editingTrade={editingTrade}

                    onClose={onClose}

                />

            </div>

        </div>

    );

}

export default TradeModal;