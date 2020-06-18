import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { MerchantTransactionViewModel } from '../../models/merchantTransaction';

@Component({
  selector: 'app-transactions-header',
  templateUrl: './transactions-header.component.html',
  styleUrls: ['./transactions-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TransactionsHeaderComponent implements OnInit {
  @Input() merchantTransactions: MerchantTransactionViewModel = null;

  // Pie
  public pieChartLabels: string[] = ['Total', 'Subsidy'];
  public pieChartData: number[] = [];
  public pieChartType = 'pie';

  constructor() {}

  ngOnInit(): void {
    this.pieChartData = [
      Number(this.merchantTransactions.totalValueOfTransactions),
      Number(this.merchantTransactions.totalValueOfSubsidies),
    ];
  }

  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }
}
