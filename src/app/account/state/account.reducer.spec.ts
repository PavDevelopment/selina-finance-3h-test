import { Failure, InProgress, Success } from 'ngx-remotedata';
import { generateRandomMerchant } from './../models/merchant';
import { generateRandomMerchantTransactionViewModel } from './../models/merchantTransaction';
import {
  LoadMerchants,
  LoadMerchantsFailure,
  LoadMerchantsSuccess,
  LoadMerchantTransactions,
  LoadMerchantTransactionsFailure,
  LoadMerchantTransactionsSuccess,
  SelectTransactionsForMerchant,
} from './account.actions';
import { accountReducer, AccountState, initialAccountState } from './account.reducer';

describe('AccountReducer', () => {
  it('should return the default state', () => {
    const action = {} as any;
    const state = accountReducer(undefined, action);
    expect(state).toBe(initialAccountState);
  });

  describe('LoadMerchants', () => {
    it('should toggle merchants state to InProgress when dispatched: LoadMerchants ', () => {
      const action = new LoadMerchants();
      const result = accountReducer(initialAccountState, action);

      expect(result).toEqual({
        ...initialAccountState,
        merchants: InProgress.of(),
        entities: {},
        ids: [],
      });
    });

    it('should add new merchants and toggle merchants state to Success when dispatched: LoadMerchantsSuccess ', () => {
      const randomMerchantsResponse = [generateRandomMerchant(), generateRandomMerchant()];
      const action = new LoadMerchantsSuccess({
        merchants: randomMerchantsResponse,
      });
      const result = accountReducer(initialAccountState, action);

      expect(result).toEqual({
        ...initialAccountState,
        merchants: Success.of(randomMerchantsResponse),
        entities: {
          [randomMerchantsResponse[0].merchant_id]: randomMerchantsResponse[0],
          [randomMerchantsResponse[1].merchant_id]: randomMerchantsResponse[1],
        },
        ids: [randomMerchantsResponse[0].merchant_id, randomMerchantsResponse[1].merchant_id],
      });
    });

    it('should record error message and toggle merchants state to Failure when dispatched: LoadMerchantsFailure ', () => {
      const mockError = new Error('error');
      const action = new LoadMerchantsFailure(mockError);
      const result = accountReducer(initialAccountState, action);

      expect(result).toEqual({
        ...initialAccountState,
        merchants: Failure.of(action.payload),
      });
    });
  });

  describe('LoadMerchantTransactions', () => {
    it('should toggle merchantTransactions state to InProgress when dispatched: LoadMerchantTransactions ', () => {
      const action = new LoadMerchantTransactions('0001');
      const result = accountReducer(initialAccountState, action);

      expect(result).toEqual({
        ...initialAccountState,
        merchantTransactions: InProgress.of(),
      });
    });

    // tslint:disable-next-line:max-line-length
    it('should add new merchantTransactions and toggle merchantTransactions state to Success when dispatched: LoadMerchantsSuccess ', () => {
      const randomMerchantsTransactionsResponse = generateRandomMerchantTransactionViewModel();
      const action = new LoadMerchantTransactionsSuccess({
        merchantTransactions: randomMerchantsTransactionsResponse,
      });
      const result = accountReducer(initialAccountState, action);

      expect(result).toEqual({
        ...initialAccountState,
        merchantTransactions: Success.of(randomMerchantsTransactionsResponse),
      });
    });

    // tslint:disable-next-line:max-line-length
    it('should record error message and toggle merchantTransactions state to Failure when dispatched: LoadMerchantTransactionsFailure ', () => {
      const mockError = new Error('error');
      const action = new LoadMerchantTransactionsFailure(mockError);
      const result = accountReducer(initialAccountState, action);

      expect(result).toEqual({
        ...initialAccountState,
        merchantTransactions: Failure.of(action.payload),
      });
    });
  });

  describe('SelectTransactionsForMerchant', () => {
    // tslint:disable-next-line:max-line-length
    it('upon dispatching: SelectTransactionsForMerchant, it should set state selectedMerchantId with the new value passed in the payload', () => {
      const action = new SelectTransactionsForMerchant({ merchantId: '0001' });
      const result = accountReducer(initialAccountState, action);
      expect(result).toEqual({
        ...initialAccountState,
        selectedMerchantId: action.payload.merchantId,
      });
    });
  });
});
