import { LoadMerchantTransactions } from './../../state/account.actions';
import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Merchant } from '../../models/merchant';

@Component({
  selector: 'app-merchant-selection',
  templateUrl: './merchant-selection.component.html',
  styleUrls: ['./merchant-selection.component.scss'],
})
export class MerchantSelectionComponent implements OnInit {
  @Input() merchants: Array<Merchant> = null;
  constructor(private store: Store<any>) {}

  ngOnInit(): void {}

  onMerchantChange(event: any) {
    this.store.dispatch(new LoadMerchantTransactions(event.value));
  }
}
