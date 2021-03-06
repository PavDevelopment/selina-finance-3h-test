import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ChartsModule } from 'ng2-charts';
import { RemoteDataModule } from 'ngx-remotedata';
import { AngularMaterialUIModule } from '../shared/ng-material-ui/ng-material.module';
import { AccountRoutingModule } from './account-routing.module';
import { AccountComponent } from './account.component';
import { MerchantSelectionComponent } from './components/merchant-selection/merchant-selection.component';
import { TransactionsHeaderComponent } from './components/transactions-header/transactions-header.component';
import { TransactionsTableComponent } from './components/transactions-table/transactions-table.component';
import { HomePageComponent } from './containers/home-page/home-page.component';
import { MerchantTransationsService } from './services/merchant-transations.service';
import { AccountEffects } from './state/account.effects';
import { accountReducer } from './state/account.reducer';

@NgModule({
  declarations: [AccountComponent, HomePageComponent, MerchantSelectionComponent, TransactionsHeaderComponent, TransactionsTableComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    AngularMaterialUIModule,
    AccountRoutingModule,
    ChartsModule,
    StoreModule.forFeature('account', accountReducer),
    EffectsModule.forFeature([AccountEffects]),
    RemoteDataModule,
  ],
  providers: [MerchantTransationsService],
  exports: [RouterModule, FlexLayoutModule, AngularMaterialUIModule],
})
export class AccountModule {}
