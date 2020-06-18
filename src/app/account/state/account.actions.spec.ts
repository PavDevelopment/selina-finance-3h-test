import { generateRandomMerchant } from './../models/merchant';
import { generateRandomMerchantTransactionViewModel } from './../models/merchantTransaction';
import {
  AccountActionTypes,
  LoadMerchants,
  LoadMerchantsFailure,
  LoadMerchantsSuccess,
  LoadMerchantTransactions,
  LoadMerchantTransactionsFailure,
  LoadMerchantTransactionsSuccess,
  SelectTransactionsForMerchant,
} from './account.actions';

const merchantId = '0001';
const mockError = new Error('server error');

describe('Account Actions', () => {
  it('should create LoadMerchants action', () => {
    const action = new LoadMerchants();
    expect(action.type).toEqual(AccountActionTypes.LoadMerchants);
  });
  it('should create LoadMerchantTransactions action', () => {
    const action = new LoadMerchantTransactions(merchantId);
    expect(action.type).toEqual(AccountActionTypes.LoadMerchantTransactions);
    expect(action.merchantId).toEqual(merchantId);
  });

  it('should create LoadMerchantsSuccess action', () => {
    const randomMerchants = [generateRandomMerchant()];
    const action = new LoadMerchantsSuccess({ merchants: randomMerchants });
    expect(action.type).toEqual(AccountActionTypes.LoadMerchantsSuccess);
    expect(action.payload.merchants).toEqual(randomMerchants);
  });

  it('should create LoadMerchantsFailure action', () => {
    const action = new LoadMerchantsFailure(mockError);
    expect(action.type).toEqual(AccountActionTypes.LoadMerchantsFailure);
    expect(action.payload).toEqual(mockError);
  });

  it('should create LoadMerchantTransactionsSuccess action', () => {
    const mockMerchantTransactionViewModel = generateRandomMerchantTransactionViewModel();
    const action = new LoadMerchantTransactionsSuccess({ merchantTransactions: mockMerchantTransactionViewModel });
    expect(action.type).toEqual(AccountActionTypes.LoadMerchantTransactionsSuccess);
    expect(action.payload.merchantTransactions).toEqual(mockMerchantTransactionViewModel);
  });

  it('should create LoadMerchantTransactionsFailure action', () => {
    const action = new LoadMerchantTransactionsFailure(mockError);
    expect(action.type).toEqual(AccountActionTypes.LoadMerchantTransactionsFailure);
    expect(action.payload).toEqual(mockError);
  });

  it('should create SelectTransactionsForMerchant action', () => {
    const action = new SelectTransactionsForMerchant({ merchantId });
    expect(action.type).toEqual(AccountActionTypes.SelectTransactionsForMerchant);
    expect(action.payload.merchantId).toEqual(merchantId);
  });
});
