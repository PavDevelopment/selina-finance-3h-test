import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { RemoteData } from 'ngx-remotedata';
import { Observable } from 'rxjs';
import { Merchant } from '../../models/merchant';
import { selectAllMerchants, selectMerchantTransations } from '../../state/account.selectors';
import { MerchantTransaction } from './../../models/merchantTransaction';
import { LoadMerchants } from './../../state/account.actions';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  merchantsResponse$: Observable<RemoteData<Merchant[], Error>> = this.store.pipe(select(selectAllMerchants));
  merchantTransactionsResponse$: Observable<RemoteData<MerchantTransaction, Error>> = this.store.pipe(select(selectMerchantTransations));

  constructor(private store: Store<any>) {}

  ngOnInit(): void {
    this.store.dispatch(new LoadMerchants());
  }
}
