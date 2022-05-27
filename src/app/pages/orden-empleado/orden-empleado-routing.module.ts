import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrdenEmpleadoPage } from './orden-empleado.page';

const routes: Routes = [
  {
    path: '',
    component: OrdenEmpleadoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrdenEmpleadoPageRoutingModule {}
