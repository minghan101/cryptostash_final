import React from 'react';
import './ConfirmModal.css'; // Ensure you have appropriate styles

const ConfirmModal = ({ show, onClose, onAdd, onReplace }) => {
    if (!show) {
        return null;
    }

    return (
        <div className="modal-overlay">
            <div className="modal-container">
                <div className="modal-header">
                    <h2 className='warningHeader'>Cryptocurrency Already Added</h2>
                    <button className="modal-close" onClick={onClose}>X</button>
                </div>
                <div className="modal-body">
                    <p>Cryptocurrency already exists. Add or Replace current amount?</p>
                </div>
                <div className="modal-footer">
                    <button className="modal-button" onClick={onAdd}>Add</button>
                    <button className="modal-button" onClick={onReplace}>Replace</button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmModal;
