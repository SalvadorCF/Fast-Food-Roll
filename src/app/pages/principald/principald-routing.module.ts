import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PrincipaldPage } from './principald.page';

const routes: Routes = [
  {
    path: '',
    component: PrincipaldPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PrincipaldPageRoutingModule {}
