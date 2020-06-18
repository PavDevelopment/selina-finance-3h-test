import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { EffectsModule } from '@ngrx/effects';
import { provideMockActions } from '@ngrx/effects/testing';
import { StoreModule } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { cold, hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';
import { MerchantTransationsService } from '../services/merchant-transations.service';
import { generateRandomMerchant } from './../models/merchant';
import { generateRandomMerchantTransactionViewModel } from './../models/merchantTransaction';
import {
  LoadMerchants,
  LoadMerchantsFailure,
  LoadMerchantsSuccess,
  LoadMerchantTransactions,
  LoadMerchantTransactionsFailure,
  LoadMerchantTransactionsSuccess,
} from './account.actions';
import { AccountEffects } from './account.effects';

const mockError = new Error('server error');

xdescribe('AccountEffects', () => {
  let action$: Observable<any>;
  let effects: AccountEffects;
  let mockMerchantTransactionsService: jasmine.SpyObj<MerchantTransationsService>;
  let store: any;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    mockMerchantTransactionsService = jasmine.createSpyObj([
      'getMerchants',
      'getMerchantTransactions',
      'calculateMerchantTransactionsViewModel',
      'calculateMerchantSubsidyPerTransaction',
    ]);

    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({}), EffectsModule.forRoot([]), HttpClientTestingModule],
      providers: [
        AccountEffects,
        provideMockActions(() => action$),
        provideMockStore(),
        { provide: MerchantTransationsService, useValue: mockMerchantTransactionsService },
      ],
    });

    httpTestingController = TestBed.get(HttpTestingController);
    effects = TestBed.get(AccountEffects);
    store = TestBed.get(store);
  });

  describe('loadMerchants$', () => {
    beforeEach(() => {
      action$ = hot('-----a', { a: new LoadMerchants() });
    });
    it('should return an observable that emits LoadMerchantsSuccess when calls to getMerchants is successful', () => {
      const randomMerchantsResponse = [generateRandomMerchant(), generateRandomMerchant()];
      mockMerchantTransactionsService.getMerchants.and.returnValue(cold('---a', { a: randomMerchantsResponse }));
      const expected$ = cold('--------a', {
        a: new LoadMerchantsSuccess({ merchants: randomMerchantsResponse }),
      });

      expect(effects.loadMerchants$).toBeObservable(expected$);
    });

    it('should return an observable that emits LoadMerchantsFailure when call to getMerchants fails', () => {
      mockMerchantTransactionsService.getMerchants.and.returnValue(cold('-#|', {}, new Error('server error')));

      const expected$ = cold('--(b|)', {
        a: new LoadMerchantsFailure(new Error('server error')),
      });

      expect(effects.loadMerchants$).toBeObservable(expected$);
    });
  });

  describe('loadMerchantTransactions$', () => {
    beforeEach(() => {
      action$ = hot('-----a', { a: new LoadMerchantTransactions('0001') });
    });
    it('should return an observable that emits LoadMerchantTransactionsSuccess when calls to getMerchantTransactions is successful', () => {
      const mockMerchantTransactionViewModel = generateRandomMerchantTransactionViewModel();
      mockMerchantTransactionsService.getMerchantTransactions.and.returnValue(cold('---a', { a: mockMerchantTransactionViewModel }));
      const expected$ = cold('--------a', {
        a: new LoadMerchantTransactionsSuccess({ merchantTransactions: mockMerchantTransactionViewModel }),
      });

      expect(effects.loadMerchantTransactions$).toBeObservable(expected$);
    });

    it('should return an observable that emits LoadMerchantTransactionsFailure when call to getMerchantTransactions fails', () => {
      mockMerchantTransactionsService.getMerchants.and.returnValue(cold('-#|', {}, new Error('server error')));

      const expected$ = cold('--(b|)', {
        a: new LoadMerchantTransactionsFailure(new Error('server error')),
      });

      expect(effects.loadMerchantTransactions$).toBeObservable(expected$);
    });
  });
});
