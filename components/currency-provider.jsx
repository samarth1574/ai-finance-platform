"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

const CurrencyContext = createContext();

export const currencies = [
  { code: "INR", symbol: "₹", rate: 1, label: "Indian Rupee" }, // Base currency in DB
  { code: "USD", symbol: "$", rate: 0.012, label: "US Dollar" }, // 1 INR ~ 0.012 USD
  { code: "EUR", symbol: "€", rate: 0.011, label: "Euro" },
  { code: "GBP", symbol: "£", rate: 0.0094, label: "British Pound" },
];

export function CurrencyProvider({ children }) {
  const [currency, setCurrency] = useState(currencies[0]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const saved = localStorage.getItem("preferred-currency");
    if (saved) {
      const found = currencies.find((c) => c.code === saved);
      if (found) setCurrency(found);
    }
  }, []);

  const changeCurrency = (code) => {
    const found = currencies.find((c) => c.code === code);
    if (found) {
      setCurrency(found);
      localStorage.setItem("preferred-currency", code);
    }
  };

  const convertAmount = (amount) => {
    if (!amount) return "0.00";
    return (parseFloat(amount) * currency.rate).toFixed(2);
  };

  if (!isMounted) {
    // Prevent hydration mismatch by rendering default initially or waiting
    return null;
  }

  return (
    <CurrencyContext.Provider value={{ currency, changeCurrency, convertAmount }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error("useCurrency must be used within a CurrencyProvider");
  }
  return context;
};
