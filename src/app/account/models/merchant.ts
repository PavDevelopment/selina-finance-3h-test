import * as faker from 'faker';

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

export const generateRandomSelf = (): Self => {
  return {
    href: faker.random.word(),
  };
};

export const generateRandomLinks = (): Links => {
  return {
    self: generateRandomSelf(),
  };
};

export const generateRandomMerchant = (): Merchant => {
  return {
    merchant_id: faker.random.word(),
    name: faker.name.lastName(),
    _links: generateRandomLinks(),
  };
};
