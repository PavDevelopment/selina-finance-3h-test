import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { MerchantTransaction, Transaction } from './../../models/merchantTransaction';

@Component({
  selector: 'app-transactions-table',
  templateUrl: './transactions-table.component.html',
  styleUrls: ['./transactions-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TransactionsTableComponent implements OnInit {
  @Input() merchantTransactions: MerchantTransaction = null;
  displayedColumns: string[] = ['description', 'date', 'price', 'subsidy'];
  dataSource: Array<Transaction> = null;
  constructor() {}

  ngOnInit(): void {}
}
