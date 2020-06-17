import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MerchantSelectionComponent } from './merchant-selection.component';

describe('MerchantSelectionComponent', () => {
  let component: MerchantSelectionComponent;
  let fixture: ComponentFixture<MerchantSelectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MerchantSelectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MerchantSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
