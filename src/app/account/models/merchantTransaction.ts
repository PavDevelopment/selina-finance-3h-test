import * as faker from 'faker';

export interface Pricing {
  subsidy: number;
  discount_subsidy: number;
  discount_cutoff: number;
}

export interface Transaction {
  description: string;
  date: Date;
  price: number;
  subsidy?: number;
}

export interface MerchantTransaction {
  name: string;
  merchant_id: string;
  pricing: Pricing;
  transactions: Transaction[];
}

export interface MerchantTransactionViewModel {
  name: string;
  merchant_id: string;
  pricing: Pricing;
  transactions: Transaction[];
  transactionsCount: number;
  totalValueOfTransactions: number;
  totalValueOfSubsidies: number;
}

export const generateRandomPricing = (): Pricing => {
  return {
    subsidy: faker.random.number(),
    discount_subsidy: faker.random.number(),
    discount_cutoff: faker.random.number(),
  };
};

export const generateRandomTransaction = (): Transaction => {
  return {
    description: faker.random.word(),
    date: faker.date.past(10),
    price: faker.random.number(),
    subsidy: faker.random.number(),
  };
};

export const generateRandomTransactions = (): Array<Transaction> => {
  return Array.from(Array(faker.random.number({ min: 1, max: 20 })), (x, index) => generateRandomTransaction());
};

export const generateRandomMerchantTransaction = (): MerchantTransaction => {
  return {
    name: faker.name.lastName(),
    merchant_id: faker.random.word(),
    pricing: generateRandomPricing(),
    transactions: generateRandomTransactions(),
  };
};

export const generateRandomMerchantTransactionViewModel = (): MerchantTransactionViewModel => {
  return {
    name: faker.random.word(),
    merchant_id: faker.random.word(),
    pricing: generateRandomPricing(),
    transactions: generateRandomTransactions(),
    transactionsCount: faker.random.number(),
    totalValueOfTransactions: faker.random.number(),
    totalValueOfSubsidies: faker.random.number(),
  };
};
