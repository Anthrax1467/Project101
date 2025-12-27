
import { Region, Currency } from '../types';

export const CURRENCIES: Record<string, Currency> = {
  'USD': { code: 'USD', symbol: '$', rateToUSD: 1 },
  'GBP': { code: 'GBP', symbol: '£', rateToUSD: 0.78 },
  'AUD': { code: 'AUD', symbol: 'A$', rateToUSD: 1.52 },
  'EUR': { code: 'EUR', symbol: '€', rateToUSD: 0.92 },
  'AED': { code: 'AED', symbol: 'د.إ', rateToUSD: 3.67 },
  'NPR': { code: 'NPR', symbol: 'रु', rateToUSD: 133.25 },
};

export const CITY_CURRENCY_MAP: Record<string, string> = {
  'London': 'GBP',
  'Aldershot': 'GBP',
  'New York': 'USD',
  'Dallas': 'USD',
  'Sydney': 'AUD',
  'Melbourne': 'AUD',
  'Dubai': 'AED',
  'Doha': 'AED',
  'Lisbon': 'EUR',
  'Kathmandu': 'NPR',
  'Global': 'USD',
};

export const currencyService = {
  getCurrencyByCity(city: string): Currency {
    const code = CITY_CURRENCY_MAP[city] || 'USD';
    return CURRENCIES[code];
  },

  formatCreditsToValue(credits: number): string {
    const dollars = credits / 100;
    return `$${dollars.toFixed(2)}`;
  },

  convertAndFormat(value: number | undefined, city: string, suffix: string = ''): string {
    if (value === undefined) return 'Contact';
    const currency = this.getCurrencyByCity(city);
    const converted = value * currency.rateToUSD;
    
    // Formatting numbers for NPR specifically
    if (currency.code === 'NPR') {
      return `${currency.symbol} ${Math.round(converted).toLocaleString('en-IN')}${suffix}`;
    }
    
    return `${currency.symbol}${converted.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}${suffix}`;
  }
};
