import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EordenPage } from './eorden.page';

const routes: Routes = [
  {
    path: '',
    component: EordenPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EordenPageRoutingModule {}
