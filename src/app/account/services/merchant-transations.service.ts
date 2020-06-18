import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { roundToXDigits } from '../helpers/roundNumber';
import { Merchant } from '../models/merchant';
import { MerchantTransaction, MerchantTransactionViewModel, Pricing, Transaction } from './../models/merchantTransaction';

@Injectable({
  providedIn: 'root',
})
export class MerchantTransationsService {
  constructor(private http: HttpClient, private store: Store<any>) {}

  private apiRootUrl = 'https://selinafinance-assets.azureedge.net/source/';
  private getMerchantsUrl = 'merchants.json';

  getMerchants(): Observable<Array<Merchant>> {
    return this.http.get(this.apiRootUrl + this.getMerchantsUrl).pipe(map((response: Array<Merchant>) => response));
  }

  getMerchantTransactions(merchantId: string): Observable<MerchantTransactionViewModel> {
    merchantId = merchantId + '.json';
    return this.http
      .get(`${this.apiRootUrl}${merchantId}`)
      .pipe(map((response: MerchantTransaction) => this.calculateMerchantTransactionsViewModel(response)));
  }

  calculateMerchantTransactionsViewModel(merchantTransaction: MerchantTransaction): MerchantTransactionViewModel {
    const calculatedTransactions = merchantTransaction.transactions.map((transaction: Transaction) => {
      return { ...transaction, subsidy: this.calculateMerchantSubsidyPerTransaction(merchantTransaction.pricing, transaction) };
    });
    return {
      ...merchantTransaction,
      transactions: calculatedTransactions,
      totalValueOfSubsidies: roundToXDigits(calculatedTransactions.reduce((acc, curr) => acc + curr.subsidy, 0), 2),
      totalValueOfTransactions: roundToXDigits(calculatedTransactions.reduce((acc, curr) => acc + curr.price, 0), 2),
      transactionsCount: calculatedTransactions.length,
    };
  }

  calculateMerchantSubsidyPerTransaction(pricing: Pricing, transaction: Transaction): number {
    return transaction.price < pricing.discount_cutoff
      ? (transaction.price * pricing.subsidy) / 100
      : (transaction.price * pricing.discount_subsidy) / 100;
  }
}
