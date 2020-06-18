import { MatProgressBar } from '@angular/material/progress-bar';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Store } from '@ngrx/store';
import { InProgress, IsFailurePipe, IsInProgressPipe, IsNotAskedPipe, IsSuccessPipe, NotAsked, RemoteData, Success } from 'ngx-remotedata';
import { BehaviorSubject } from 'rxjs';
import { Shallow } from 'shallow-render';
import { ExtendedShallow } from 'src/app/shared/ng-material-ui/testing/extended-shallow.spec';
import { AccountModule } from '../../account.module';
import { MerchantTransationsService } from '../../services/merchant-transations.service';
import { AccountActionTypes } from '../../state/account.actions';
import { selectAllMerchants, selectMerchantTransations } from '../../state/account.selectors';
import { MerchantSelectionComponent } from './../../components/merchant-selection/merchant-selection.component';
import { TransactionsHeaderComponent } from './../../components/transactions-header/transactions-header.component';
import { TransactionsTableComponent } from './../../components/transactions-table/transactions-table.component';
import { generateRandomMerchant } from './../../models/merchant';
import { generateRandomMerchantTransactionViewModel } from './../../models/merchantTransaction';
import { HomePageComponent } from './home-page.component';

xdescribe('HomePageComponent', () => {
  let shallow: Shallow<HomePageComponent>;
  const merchantsResponse$: BehaviorSubject<RemoteData<any, Error>> = new BehaviorSubject(NotAsked.of());
  const merchantTransactionsResponse$: BehaviorSubject<RemoteData<any, Error>> = new BehaviorSubject(NotAsked.of());
  const mockMerchantTransactionService: jasmine.SpyObj<MerchantTransationsService> = jasmine.createSpyObj([
    'getMerchants',
    'getMerchantTransactions',
    'calculateMerchantTransactionsViewModel',
    'calculateMerchantSubsidyPerTransaction',
  ]);
  beforeEach(async () => {
    shallow = new ExtendedShallow(HomePageComponent, AccountModule)
      .provideStore([
        {
          selector: selectAllMerchants,
          mockedValue: merchantsResponse$.asObservable(),
        },
        {
          selector: selectMerchantTransations,
          mockedValue: merchantTransactionsResponse$.asObservable(),
        },
      ])
      .provide({ provide: MerchantTransationsService, useValue: mockMerchantTransactionService })
      .import(BrowserAnimationsModule)
      .replaceModule(BrowserAnimationsModule, NoopAnimationsModule)
      .dontMock(MerchantTransationsService, Store, IsInProgressPipe, IsFailurePipe, IsSuccessPipe, IsNotAskedPipe);
  });
  describe('ngOnInit', () => {
    it('should dispatch LoadMerchants action upon component initialization', async () => {
      const { instance, get } = await shallow.render();
      expect(get(Store).dispatch).toHaveBeenCalledWith(
        jasmine.objectContaining({
          type: AccountActionTypes.LoadMerchants,
        })
      );
    });
  });

  describe('loading animation', () => {
    it('should show mat-progress-bar component if merchantsResponse is being processed', async () => {
      merchantsResponse$.next(InProgress.of());
      merchantTransactionsResponse$.next(NotAsked.of());
      const { findComponent } = await shallow.render();
      expect(findComponent(MatProgressBar)).toHaveFound(1);
      expect(findComponent(MerchantSelectionComponent)).not.toHaveFoundOne();
      expect(findComponent(TransactionsHeaderComponent)).not.toHaveFoundOne();
      expect(findComponent(TransactionsTableComponent)).not.toHaveFoundOne();
    });
    it('should show the dropdown only and no results in the table and no spinning animation if no merchant has been selected', async () => {
      merchantsResponse$.next(Success.of([]));
      merchantTransactionsResponse$.next(NotAsked.of());
      const { findComponent } = await shallow.render();
      expect(findComponent(MatProgressBar)).not.toHaveFoundOne();
      expect(findComponent(MerchantSelectionComponent)).toHaveFoundOne();
      expect(findComponent(TransactionsHeaderComponent)).not.toHaveFoundOne();
      expect(findComponent(TransactionsTableComponent)).not.toHaveFoundOne();
    });
    it('should show loading animation and dropdown/list of merchants if we are waiting for transactions to be loaded', async () => {
      merchantsResponse$.next(Success.of([]));
      merchantTransactionsResponse$.next(InProgress.of());
      const { findComponent } = await shallow.render();
      expect(findComponent(MatProgressBar)).toHaveFoundOne();
      expect(findComponent(MerchantSelectionComponent)).toHaveFoundOne();
      expect(findComponent(TransactionsHeaderComponent)).not.toHaveFoundOne();
      expect(findComponent(TransactionsTableComponent)).not.toHaveFoundOne();
    });
    it('should show both table and list of merchants with no spinning animation if all responses were success from server', async () => {
      merchantsResponse$.next(Success.of([generateRandomMerchant()]));
      merchantTransactionsResponse$.next(Success.of(generateRandomMerchantTransactionViewModel()));
      const { findComponent } = await shallow.render();
      expect(findComponent(MatProgressBar)).not.toHaveFoundOne();
      expect(findComponent(MerchantSelectionComponent)).toHaveFoundOne();
      expect(findComponent(TransactionsHeaderComponent)).toHaveFoundOne();
      expect(findComponent(TransactionsTableComponent)).toHaveFoundOne();
    });
  });
});
