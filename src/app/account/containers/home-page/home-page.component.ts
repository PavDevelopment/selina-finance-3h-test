import { Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { RemoteData } from 'ngx-remotedata';
import { Observable } from 'rxjs';
import { takeWhile } from 'rxjs/operators';
import { Merchant } from '../../models/merchant';
import { selectAllMerchants, selectMerchantTransations, selectActiveMerchantId } from '../../state/account.selectors';
import { MerchantTransaction } from './../../models/merchantTransaction';
import { LoadMerchants, LoadMerchantTransactions } from './../../state/account.actions';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit, OnDestroy {
  isComponentActive = true;

  merchantsResponse$: Observable<RemoteData<Merchant[], Error>> = this.store.pipe(select(selectAllMerchants));
  merchantTransactionsResponse$: Observable<RemoteData<MerchantTransaction, Error>> = this.store.pipe(select(selectMerchantTransations));

  merchants: Merchant[] = null;
  merchantTransactions: MerchantTransaction = null;
  constructor(private store: Store<any>) {}

  ngOnInit(): void {
    this.store.dispatch(new LoadMerchants());

    this.merchantTransactionsResponse$.pipe(takeWhile(() => this.isComponentActive)).subscribe((merchantTransactions) => {
      // hacking as panicked to extract data from pipe not enough time but the pattern should be with async on html for InProgress | InSuccess | InFailure
      const { tag, val } = (merchantTransactions = merchantTransactions as any);
      if (tag === 'Success') {
        this.merchantTransactions = val;
        console.log('merchantTransactions', this.merchantTransactions);
      }
    });
    this.merchantsResponse$.pipe(takeWhile(() => this.isComponentActive)).subscribe((merchants) => {
      const { tag, val } = (merchants = merchants as any);
      if (tag === 'Success') {
        this.merchants = val;
        console.log('merchants', this.merchants);
      }
    });
  }

  ngOnDestroy(): void {
    this.isComponentActive = false;
  }
}
