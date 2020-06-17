import { Action } from '@ngrx/store';
import { Merchant } from '../models/merchant';
import { MerchantTransaction } from './../models/merchantTransaction';

export enum AccountActionTypes {
  LoadMerchants = '[Account] Load Merchants',
  LoadMerchantsSuccess = '[Account] Load Merchants Success',
  LoadMerchantsFailure = '[Account] Load Merchants Failure',

  LoadMerchantTransactions = '[Account] Load Merchant Transactions',
  LoadMerchantTransactionsSuccess = '[Account] Load Merchant Transactions Success',
  LoadMerchantTransactionsFailure = '[Account] Load Merchant Transactions Failure',

  SelectTransactionsForMerchant = '[Account] Select Transactions For Merchant',
}

export class LoadMerchants implements Action {
  readonly type = AccountActionTypes.LoadMerchants;
}

export class LoadMerchantsSuccess implements Action {
  readonly type = AccountActionTypes.LoadMerchantsSuccess;
  constructor(public payload: { merchants: Array<Merchant> }) {}
}

export class LoadMerchantsFailure implements Action {
  readonly type = AccountActionTypes.LoadMerchantsFailure;
  constructor(public payload: { error: any }) {}
}

export class LoadMerchantTransactions implements Action {
  readonly type = AccountActionTypes.LoadMerchantTransactions;
  constructor(public merchantId: string) {}
}

export class LoadMerchantTransactionsSuccess implements Action {
  readonly type = AccountActionTypes.LoadMerchantTransactionsSuccess;
  constructor(public payload: { merchantTransactions: MerchantTransaction }) {}
}

export class LoadMerchantTransactionsFailure implements Action {
  readonly type = AccountActionTypes.LoadMerchantTransactionsFailure;
  constructor(public payload: { error: any }) {}
}

export class SelectTransactionsForMerchant implements Action {
  readonly type = AccountActionTypes.SelectTransactionsForMerchant;
  constructor(public payload: { merchantId: string }) {}
}

export type AccountActions =
  | LoadMerchants
  | LoadMerchantsSuccess
  | LoadMerchantsFailure
  | LoadMerchantTransactions
  | LoadMerchantTransactionsSuccess
  | LoadMerchantTransactionsFailure
  | SelectTransactionsForMerchant;
