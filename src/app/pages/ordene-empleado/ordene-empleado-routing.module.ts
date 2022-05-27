import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrdeneEmpleadoPage } from './ordene-empleado.page';

const routes: Routes = [
  {
    path: '',
    component: OrdeneEmpleadoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrdeneEmpleadoPageRoutingModule {}
