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
