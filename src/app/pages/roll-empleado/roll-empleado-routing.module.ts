import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RollEmpleadoPage } from './roll-empleado.page';

const routes: Routes = [
  {
    path: '',
    component: RollEmpleadoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RollEmpleadoPageRoutingModule {}
