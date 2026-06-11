export interface CurrencyConfig {
  code: string;
  symbol: string;
  rate: number; // rate multiplier relative to USD (1.00 is base)
  name: string;
  flag: string;
  countryCode: string;
}

export const CURRENCIES: CurrencyConfig[] = [
  { code: 'INR', symbol: '₹', rate: 83.0, name: 'India (INR)', flag: '🇮🇳', countryCode: 'IN' },
  { code: 'BDT', symbol: '৳', rate: 117.0, name: 'Bangladesh (BDT)', flag: '🇧🇩', countryCode: 'BD' },
  { code: 'USD', symbol: '$', rate: 1.0, name: 'United States (USD)', flag: '🇺🇸', countryCode: 'US' },
  { code: 'EUR', symbol: '€', rate: 0.92, name: 'Europe (EUR)', flag: '🇪🇺', countryCode: 'EU' },
  { code: 'GBP', symbol: '£', rate: 0.79, name: 'United Kingdom (GBP)', flag: '🇬🇧', countryCode: 'GB' },
  { code: 'CAD', symbol: 'C$', rate: 1.37, name: 'Canada (CAD)', flag: '🇨🇦', countryCode: 'CA' },
];

export function detectUserCurrency(): CurrencyConfig {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
    const locale = (navigator.language || 'en-US').toUpperCase();
    
    if (tz.includes('Calcutta') || tz.includes('Kolkata') || locale.includes('-IN') || locale === 'IN') {
      return CURRENCIES[0]; // INR
    }
    if (tz.includes('Dhaka') || locale.includes('-BD') || locale === 'BD') {
      return CURRENCIES[1]; // BDT
    }
    if (tz.includes('London') || tz.includes('Belfast') || locale.includes('-GB') || locale === 'GB') {
      return CURRENCIES[4]; // GBP
    }
    if (tz.includes('Europe') || locale.includes('FR') || locale.includes('DE') || locale.includes('ES') || locale.includes('IT')) {
      return CURRENCIES[3]; // EUR
    }
    if (tz.includes('Toronto') || tz.includes('Vancouver') || locale.includes('-CA') || locale === 'CA') {
      return CURRENCIES[5]; // CAD
    }
    
    // Default to INR (Rupees) as requested as the primary default
    return CURRENCIES[0];
  } catch (e) {
    return CURRENCIES[0]; // Fallback to INR
  }
}

export function formatPriceWithCurrency(priceUSD: number, currency: CurrencyConfig): string {
  const converted = priceUSD * currency.rate;
  if (currency.code === 'INR') {
    // Elegant Indian numbering system (e.g., Lakhs if huge, though ours are thousands)
    return `₹${Math.round(converted).toLocaleString('en-IN')}`;
  }
  if (currency.code === 'BDT') {
    return `৳${Math.round(converted).toLocaleString('en-IN')}`;
  }
  if (currency.code === 'EUR') {
    return `€${converted.toFixed(2)}`;
  }
  if (currency.code === 'GBP') {
    return `£${converted.toFixed(2)}`;
  }
  if (currency.code === 'CAD') {
    return `C$${converted.toFixed(2)}`;
  }
  return `$${converted.toFixed(2)}`;
}
