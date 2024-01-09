import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AssociateRoutingModule} from './associate-routing.module';
import {AssociateDashboardComponent} from './associate-dashboard/associate-dashboard.component';


@NgModule({
  declarations: [
    AssociateDashboardComponent
  ],
  imports: [
    CommonModule,
    AssociateRoutingModule
  ]
})
export class AssociateModule {
}
