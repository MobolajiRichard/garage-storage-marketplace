import { CURRENCY } from "@/components/space/SpaceInfo";

export const formatPriceInput = (input: string): string => {
  let cleaned = input.replace(/,/g, '.').replace(/[^0-9.]/g, '');

  // Handle multiple decimal points - keep only the first one
  const decimalIndex = cleaned.indexOf('.');
  if (decimalIndex !== -1) {
    const beforeDecimal = cleaned.substring(0, decimalIndex);
    const afterDecimal = cleaned.substring(decimalIndex + 1).replace(/\./g, '');
    cleaned = beforeDecimal + '.' + afterDecimal;
  }

  // Split into integer and decimal parts
  const parts = cleaned.split('.');
  const integerPart = parts[0] || '';
  const decimalPart = parts[1] || '';

  // Add thousand separators to integer part
  const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

  // Limit decimal part to 2 digits
  const limitedDecimal = decimalPart.slice(0, 2);

  // Return formatted price
  if (cleaned.includes('.')) {
    return formattedInteger + '.' + limitedDecimal;
  }
  return formattedInteger;
};

export const priceParser = (formattedValue: string): string => {
  if (!formattedValue) return '';

  // Remove spaces (thousand separators) but keep the original string format
  const cleanedPrice = formattedValue.replace(/\s/g, '');

  // Return the cleaned string as-is to preserve decimal points and formatting
  return cleanedPrice;
};

type Currency = typeof CURRENCY[number];

const currencySymbolMap: Record<Currency, string> = {
  USD: "$",
  EUR: "€",
  NGN: "₦",
  GBP: "£",
  AUD: "A$",
};

export function getCurrencySymbol(currency: Currency): string {
  return currencySymbolMap[currency] ?? currency;
}