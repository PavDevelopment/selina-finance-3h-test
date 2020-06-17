import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of, pipe } from 'rxjs';
import { catchError, exhaustMap, map, switchMap } from 'rxjs/operators';
import { Merchant } from '../models/merchant';
import * as accountActions from '../state/account.actions';
import { MerchantTransationsService } from './../services/merchant-transations.service';

@Injectable()
export class AccountEffects {
  constructor(private actions$: Actions, private merchantTransationsService: MerchantTransationsService) {}

  @Effect()
  loadMerchants$: Observable<Action> = this.actions$.pipe(
    ofType<accountActions.LoadMerchants>(accountActions.AccountActionTypes.LoadMerchants),
    pipe(
      exhaustMap(() =>
        this.merchantTransationsService.getMerchants().pipe(
          map((merchants: Merchant[]) => new accountActions.LoadMerchantsSuccess({ merchants })),
          catchError((error) => of(new accountActions.LoadMerchantsFailure({ error })))
        )
      )
    )
  );

  @Effect()
  loadMerchantTransactions$: Observable<Action> = this.actions$.pipe(
    ofType<accountActions.LoadMerchantTransactions>(accountActions.AccountActionTypes.LoadMerchantTransactions),
    switchMap((action) => {
      return this.merchantTransationsService.getMerchantTransactions(action.merchantId).pipe(
        map((merchantTransactions) => new accountActions.LoadMerchantTransactionsSuccess({ merchantTransactions })),
        catchError((error) => of(new accountActions.LoadMerchantTransactionsFailure(error)))
      );
    })
  );
}
