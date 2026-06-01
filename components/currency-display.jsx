"use client";

import { useCurrency } from "./currency-provider";

export function CurrencyDisplay({ amount, hideSymbol = false, className = "", suffix = "" }) {
  const { currency, convertAmount } = useCurrency();
  const converted = convertAmount(amount);

  // Parse for formatting if needed, otherwise just display
  const formatted = parseFloat(converted).toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return (
    <span className={className}>
      {!hideSymbol && currency.symbol}
      {formatted}
      {suffix && ` ${suffix}`}
    </span>
  );
}
