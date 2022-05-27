import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VerordenPage } from './verorden.page';

const routes: Routes = [
  {
    path: '',
    component: VerordenPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VerordenPageRoutingModule {}
