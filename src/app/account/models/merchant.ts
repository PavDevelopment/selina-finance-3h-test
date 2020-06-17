export interface Self {
    href: string;
}

export interface Links {
    self: Self;
}

export interface Merchant {
    merchant_id: string;
    name: string;
    _links: Links;
}
