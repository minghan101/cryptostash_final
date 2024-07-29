import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import './Register.css';
import { useCryptoData } from '../CryptoDataContext';
import ConfirmModal from './ConfirmModal';

const Register = () => {
    const [formData, setFormData] = useState({
        cryptoAsset: '',
        cryptoAmount: '',
        buyPrice: '',
    });

    const [message, setMessage] = useState('');
    const [validationMessage, setValidationMessage] = useState('');
    const [existingCrypto, setExistingCrypto] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [actionType, setActionType] = useState('');
    const { fetchCryptoData, realCryptos } = useCryptoData();
    const [suggestions, setSuggestions] = useState([]);
    const suggestionsRef = useRef(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value.trim() });

        if (name === 'cryptoAsset') {
            const filteredSuggestions = realCryptos.filter(crypto =>
                typeof crypto.name === 'string' && crypto.name.toLowerCase().startsWith(value.toLowerCase())
            ).map(crypto => crypto.name);
            setSuggestions(filteredSuggestions);
        }
    };

    const handleSuggestionClick = (suggestion) => {
        setFormData({ ...formData, cryptoAsset: suggestion });
        setSuggestions([]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!realCryptos.map(crypto => crypto.name).includes(formData.cryptoAsset)) {
            setValidationMessage('Please key in valid CryptoAssets.');
            return;
        }

        if (parseFloat(formData.cryptoAmount) <= 0) {
            setValidationMessage('Please key in a positive amount.');
            return;
        }

        if (parseFloat(formData.buyPrice) <= 0) {
            setValidationMessage('Please key in a valid buy price.');
            return;
        }

        setValidationMessage('');

        try {
            const response = await axios.get(`http://localhost:5000/getCryptoAsset/${formData.cryptoAsset}`);
            
            if (response.status === 200) {
                setExistingCrypto(response.data);
                setActionType('Add');
                setShowModal(true);
            }
        } catch (error) {
            saveCryptoAsset('Add');
        }
    };

    const saveCryptoAsset = async (action) => {
        try {
            const response = await axios.post('http://localhost:5000/storeCryptoAsset', {
                ...formData,
                action,
            });
            setMessage(response.data.message);
            if (response.data.success) {
                const transactionData = { // Create a new transaction
                    cryptoAsset: formData.cryptoAsset,
                    cryptoAmount: formData.cryptoAmount,
                    buyPrice: formData.buyPrice,
                    sellPrice: 0,
                    date: new Date(),
                };
                await axios.post('http://localhost:5000/storeTransaction', transactionData); // Store the new transaction
                setFormData({ cryptoAsset: '', cryptoAmount: '', buyPrice: '' });
                fetchCryptoData();
            }
        } catch (error) {
            console.error('Error:', error);
            setMessage('An error occurred. Please try again.');
        }
    };

    const handleAdd = () => {
        saveCryptoAsset('Add');
        setShowModal(false);
    };

    const handleReplace = () => {
        saveCryptoAsset('Replace');
        setShowModal(false);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (suggestionsRef.current && !suggestionsRef.current.contains(event.target)) {
                setSuggestions([]);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="container">
            <div className="box form-box">
                <header>Key in Your Crypto Assets</header>
                {message && <div className="message"><p>{message}</p></div>}
                <form onSubmit={handleSubmit}>
                    <div className="field-input">
                        <label htmlFor="cryptoAsset">Crypto Asset</label>
                        <input
                            type="text"
                            name="cryptoAsset"
                            id="cryptoAsset"
                            value={formData.cryptoAsset}
                            onChange={handleChange}
                            required
                            autoComplete="off"
                        />
                        {suggestions.length > 0 && (
                            <ul className="suggestions-list" ref={suggestionsRef}>
                                {suggestions.map((suggestion, index) => (
                                    <li key={index} onClick={() => handleSuggestionClick(suggestion)}>
                                        {suggestion}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                    <div className="field-input">
                        <label htmlFor="cryptoAmount">Amount</label>
                        <input
                            type="number"
                            name="cryptoAmount"
                            id="cryptoAmount"
                            value={formData.cryptoAmount}
                            onChange={handleChange}
                            required
                            step="0.01"
                        />
                    </div>
                    <div className="field-input">
                        <label htmlFor="buyPrice">Buy Price</label>
                        <input
                            type="number"
                            name="buyPrice"
                            id="buyPrice"
                            value={formData.buyPrice}
                            onChange={handleChange}
                            required
                            step="0.01"
                        />
                    </div>
                    <button type="submit">Submit</button>
                    {validationMessage && <div className="validation-message"><p>{validationMessage}</p></div>}
                </form>

                <ConfirmModal
                    show={showModal}
                    onClose={() => setShowModal(false)}
                    onAdd={handleAdd}
                    onReplace={handleReplace}
                />
            </div>
        </div>
    );
};

export default Register;