import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Merchant } from '../models/merchant';
import { MerchantTransaction } from './../models/merchantTransaction';

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

  getMerchantTransactions(merchantId: string): Observable<MerchantTransaction> {
    return this.http.get(`${this.apiRootUrl}${merchantId}`).pipe(map((response: MerchantTransaction) => response));
  }

  calculateMerchantSubsidy(merchant: Merchant): any {
    // TODO calculate logic
    return null;
  }
}
