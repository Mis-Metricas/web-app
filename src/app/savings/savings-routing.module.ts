/** Angular Imports */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/** Translation Imports */
import { extract } from '../core/i18n/i18n.service';

/** Custom Components */
import { SavingAccountActionsComponent } from './saving-account-actions/saving-account-actions.component';
import { AddSavingsChargeComponent } from './add-savings-charge/add-savings-charge.component';

/** Custom Resolvers */
import { SavingAccountTransactionTemplateResolver } from './common-resolvers/saving-transaction-template.resolver';
import { SavingsChargeTemplateResolver } from './common-resolvers/savings-charge-template.resolver';

const routes: Routes = [
  {
    path: '',
    data: { title: extract('All Savings'), breadcrumb: 'Savings', routeParamBreadcrumb: false },
    // Component to view all saving accounts Comes Here
    children: [
      {
        path: ':savingAccountId',
        data: { title: extract('Saving Account View'), routeParamBreadcrumb: 'savingAccountId' },
        // Component For Saving Account View Comes Here
        children: [
          {
            path: 'add-savings-charge',
            component: AddSavingsChargeComponent,
            data: {
              title: extract('Add Savings Charge'),
              breadcrumb: 'Add Savings Charge',
              routeParamBreadcrumb: false
            },
            resolve: {
              savingsChargeTemplate: SavingsChargeTemplateResolver
            }
          },
          {
            path: ':action',
            component: SavingAccountActionsComponent,
            data: { title: extract('Saving Account Actions'), routeParamBreadcrumb: 'action' },
            resolve: {
              savingAccountTransactionTemplate: SavingAccountTransactionTemplateResolver
            }
          }
        ]
      }
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  declarations: [],
  providers: [SavingAccountTransactionTemplateResolver, SavingsChargeTemplateResolver]
})
export class SavingsRoutingModule {}
