import React, { createContext, useContext, useEffect, useState } from "react";

const Crypto = createContext();

const CryptoProvider = ({ children }) => {
  const [currency, setCurrency] = useState("INR");
  const [symbol, setSymbol] = useState("₹");

  useEffect(() => {
    switch (currency) {
      case "USD":
        setSymbol("$");
        break;
      case "SGD":
        setSymbol("S$");
        break;
      case "BTC":
        setSymbol("₿");
        break;
      case "ETH":
        setSymbol("Ξ");
        break;
      case "LTC":
        setSymbol("Ł");
        break;
      default:
        setSymbol("₹");
    }
  }, [currency]);

  return (
    <Crypto.Provider value={{ currency, setCurrency, symbol }}>
      {children}
    </Crypto.Provider>
  );
};

export default CryptoProvider;

export const useCrypto = () => useContext(Crypto);

export const CryptoState = () => {
  return useContext(Crypto);
};