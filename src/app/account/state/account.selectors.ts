import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromAccount from './account.reducer';

export const selectAccountState = createFeatureSelector<fromAccount.AccountState>('account');

export const selectAllMerchants = createSelector(selectAccountState, (state) => {
  if (state.merchants) {
    return state.merchants;
  }
  return undefined;
});

export const selectActiveMerchantId = createSelector(selectAccountState, (state) => {
  if (state.selectedMerchantId) {
    return state.selectedMerchantId;
  }
  return undefined;
});

export const selectMerchantTransations = createSelector(selectAccountState, (state) => {
  if (state.merchantTransactions) {
    return state.merchantTransactions;
  }
  return undefined;
});
