import { FormatOptions, unformat } from 'currency-formatter';

export const CurrencyId = {
  USD: 1,
  GBP: 2,
  EUR: 3,
  CHF: 4,
  RUB: 5,
  PLN: 6,
  BRL: 7,
  JPY: 8,
  NOK: 9,
  IDR: 10,
  MYR: 11,
  PHP: 12,
  SGD: 13,
  THB: 14,
  VND: 15,
  KRW: 16,
  TRY: 17,
  UAH: 18,
  MXN: 19,
  CAD: 20,
  AUD: 21,
  NZD: 22,
  CNY: 23,
  INR: 24,
  CLP: 25,
  PEN: 26,
  COP: 27,
  ZAR: 28,
  HKD: 29,
  TWD: 30,
  SAR: 31,
  AED: 32,
  ARS: 34,
  ILS: 35,
  BYN: 36,
  KZT: 37,
  KWD: 38,
  QAR: 39,
  CRC: 40,
  UYU: 41
};

export type CurrencyIdKey = keyof typeof CurrencyId;
export interface ICurrency {
  readonly name: string;
  readonly steamId: number;
  /** The code property in the FormatOptions don't need to be set. */
  readonly parse: (value: string, options?: FormatOptions) => number;
}

export const Currency = {} as Record<CurrencyIdKey, ICurrency>;

for (const name in CurrencyId) {
  Currency[name as CurrencyIdKey] = {
    name,
    // unformat support list https://github.com/smirzaei/currency-formatter/blob/master/currencies.json
    parse: (value, opts) => unformat(value, { code: name, ...opts }),
    steamId: CurrencyId[name as CurrencyIdKey]
  };
}

export const fromId = (id: number): ICurrency | null => {
  for (const name in CurrencyId) {
    if (CurrencyId[name as CurrencyIdKey] === id) {
      return Currency[name as CurrencyIdKey];
    }
  }
  return null;
};
