import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Merchant } from '../../models/merchant';
import { LoadMerchantTransactions } from './../../state/account.actions';

@Component({
  selector: 'app-merchant-selection',
  templateUrl: './merchant-selection.component.html',
  styleUrls: ['./merchant-selection.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MerchantSelectionComponent implements OnInit {
  @Input() merchants: Array<Merchant> = null;
  constructor(private store: Store<any>) {}

  ngOnInit(): void {}

  onMerchantDropdownChange(event: any) {
    this.store.dispatch(new LoadMerchantTransactions(event.value));
  }

  onMerchantClick(merchantId) {
    this.store.dispatch(new LoadMerchantTransactions(merchantId));
  }
}
