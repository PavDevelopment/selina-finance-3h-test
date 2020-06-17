import { MerchantTransaction, Transaction } from './../../models/merchantTransaction';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-transactions-table',
  templateUrl: './transactions-table.component.html',
  styleUrls: ['./transactions-table.component.scss']
})
export class TransactionsTableComponent implements OnInit {
  @Input() merchantTransactions: MerchantTransaction = null;
  displayedColumns: string[] = ['description', 'date', 'price', 'subsidy'];
  dataSource: Array<Transaction> = null;
  constructor() { }

  ngOnInit(): void {
  }

}
