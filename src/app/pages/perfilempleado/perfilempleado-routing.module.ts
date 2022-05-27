import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PerfilempleadoPage } from './perfilempleado.page';

const routes: Routes = [
  {
    path: '',
    component: PerfilempleadoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PerfilempleadoPageRoutingModule {}
