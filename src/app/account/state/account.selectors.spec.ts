import { Success } from 'ngx-remotedata';
import { generateRandomMerchant } from '../models/merchant';
import { generateRandomMerchantTransactionViewModel } from './../models/merchantTransaction';
import { AccountState, initialAccountState } from './account.reducer';
import { selectActiveMerchantId, selectAllMerchants, selectMerchantTransations } from './account.selectors';

describe('Account selectors', () => {
  const accountState: AccountState = initialAccountState;

  let storeState = {
    account: accountState,
  };

  beforeEach(() => {
    storeState = {
      account: accountState,
    };
  });

  describe('selectAllMerchants', () => {
    it('should return all the merchants from the store', () => {
      const merchants = [generateRandomMerchant(), generateRandomMerchant()];
      storeState = {
        ...storeState,
        account: {
          ...storeState.account,
          merchants: Success.of(merchants),
        } as any
      };
      const results = selectAllMerchants(storeState);
      expect(results).toEqual(jasmine.any(Success));
    });
  });

  describe('selectActiveMerchantId', () => {
    it('should return currently selected active merchantId', () => {
      const merchants = [generateRandomMerchant(), generateRandomMerchant()];
      storeState = {
        ...storeState,
        account: {
          ...storeState.account,
          selectedMerchantId: '0001',
        },
      };
      const results = selectActiveMerchantId(storeState);

      expect(results).toBe('0001');
    });
  });

  describe('selectMerchantTransations', () => {
    it('should return selected Merchant Transactions', () => {
      const merchantTransactions = generateRandomMerchantTransactionViewModel();
      storeState = {
        ...storeState,
        account: {
          ...storeState.account,
          merchantTransactions: Success.of(merchantTransactions),
        } as any
      };
      const results = selectMerchantTransations(storeState);
      expect(results).toEqual(jasmine.any(Success));
    });
  });
});
