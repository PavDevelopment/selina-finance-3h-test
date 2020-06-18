import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { generateRandomMerchant, Merchant } from '../models/merchant';
import { MerchantTransaction, Pricing } from '../models/merchantTransaction';
import {
  generateRandomMerchantTransaction,
  generateRandomPricing,
  generateRandomTransaction,
  Transaction,
} from './../models/merchantTransaction';
import { MerchantTransationsService } from './merchant-transations.service';

const apiRootUrl = 'https://selinafinance-assets.azureedge.net/source/';
const getMerchantsUrl = 'merchants.json';

describe('MerchantTransationsService', () => {
  let merchantTransationsService: MerchantTransationsService;
  let httpMock: HttpTestingController;
  let store: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MerchantTransationsService, provideMockStore()],
    });
    merchantTransationsService = TestBed.inject(MerchantTransationsService);
    httpMock = TestBed.get(HttpTestingController);
    store = TestBed.get(Store);
  });

  it('should be created', () => {
    expect(merchantTransationsService).toBeTruthy();
  });

  it('getMerchants function should be able to retrieve Merchants from the API via GET', () => {
    const mockApiResponse: Merchant[] = [generateRandomMerchant()];
    merchantTransationsService.getMerchants().subscribe((response) => {
      expect(response).toBe(mockApiResponse);
      expect(response.length).toBe(mockApiResponse.length);
    });

    const request = httpMock.expectOne(apiRootUrl + getMerchantsUrl);
    expect(request.request.method).toBe('GET');
    request.flush(mockApiResponse);
  });
  describe('calculateMerchantSubsidyPerTransaction', () => {
    it('should calculate a standard subsidy 10% out of 500 becuase the price is lower then discount_cutoff', () => {
      const expectedSubsidiy = 50;
      const pricing: Pricing = generateRandomPricing();
      const transaction: Transaction = generateRandomTransaction();

      pricing.subsidy = 10;
      pricing.discount_cutoff = 5;
      pricing.discount_cutoff = 1000;
      transaction.price = 500;

      expect(merchantTransationsService.calculateMerchantSubsidyPerTransaction(pricing, transaction)).toBe(expectedSubsidiy);
    });

    it('should calculate a discount subsidy 5% out of 500 becuase the price is higher then discount_cutoff', () => {
      const expectedSubsidiy = 25;
      const pricing: Pricing = generateRandomPricing();
      const transaction: Transaction = generateRandomTransaction();

      pricing.subsidy = 10;
      pricing.discount_subsidy = 5;
      pricing.discount_cutoff = 100;
      transaction.price = 500;

      expect(merchantTransationsService.calculateMerchantSubsidyPerTransaction(pricing, transaction)).toBe(expectedSubsidiy);
    });
  });
  describe('calculateMerchantTransactionsViewModel', () => {
    it('should create a correct ViewModel with correct totals calculated of all the transactions', () => {
      const randomMerchantTransaction: MerchantTransaction = generateRandomMerchantTransaction();
      const randomTransaction: Transaction = generateRandomTransaction();
      randomTransaction.price = 50;

      randomMerchantTransaction.transactions = [randomTransaction];
      randomMerchantTransaction.pricing.subsidy = 10;
      randomMerchantTransaction.pricing.discount_subsidy = 1;
      randomMerchantTransaction.pricing.discount_cutoff = 200;

      const result = merchantTransationsService.calculateMerchantTransactionsViewModel(randomMerchantTransaction);

      expect(result.transactionsCount).toBe(1);
      expect(result.totalValueOfSubsidies).toBe(5);
      expect(result.totalValueOfTransactions).toBe(50);
    });
  });
});
