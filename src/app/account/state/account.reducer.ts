import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Failure, InProgress, NotAsked, RemoteData, Success } from 'ngx-remotedata';
import { Merchant } from '../models/merchant';
import { MerchantTransactionViewModel } from './../models/merchantTransaction';
import { AccountActions, AccountActionTypes } from './account.actions';

export interface AccountState extends EntityState<Merchant> {
  merchants: RemoteData<Merchant[], Error>;
  merchantTransactions: RemoteData<MerchantTransactionViewModel, Error>;
  selectedMerchantId: string;
}

export const adapter: EntityAdapter<any> = createEntityAdapter<any>({
  selectId: (merchant: Merchant) => merchant.merchant_id,
});

export const initialAccountState: AccountState = adapter.getInitialState({
  merchants: NotAsked.of(),
  merchantTransactions: NotAsked.of(),
  selectedMerchantId: null,
});

export function accountReducer(state = initialAccountState, action: AccountActions): AccountState {
  switch (action.type) {
    case AccountActionTypes.LoadMerchants:
      return {
        ...state,
        merchants: InProgress.of(),
      };

    case AccountActionTypes.LoadMerchantsFailure:
      return {
        ...state,
        merchants: Failure.of(action.payload),
      };

    case AccountActionTypes.LoadMerchantsSuccess:
      return adapter.setAll(action.payload.merchants, {
        ...state,
        merchants: Success.of(action.payload.merchants),
      });

    case AccountActionTypes.LoadMerchantTransactions:
      return {
        ...state,
        merchantTransactions: InProgress.of(),
      };

    case AccountActionTypes.LoadMerchantTransactionsFailure:
      return {
        ...state,
        merchantTransactions: Failure.of(action.payload),
      };

    case AccountActionTypes.LoadMerchantTransactionsSuccess:
      return {
        ...state,
        merchantTransactions: Success.of(action.payload.merchantTransactions),
      };

    case AccountActionTypes.SelectTransactionsForMerchant:
      return {
        ...state,
        selectedMerchantId: action.payload.merchantId,
      };

    default: {
      return state;
    }
  }
}

export const { selectAll, selectEntities, selectIds, selectTotal } = adapter.getSelectors();
