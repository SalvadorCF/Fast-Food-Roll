import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VerordenEmpleadoPage } from './verorden-empleado.page';

const routes: Routes = [
  {
    path: '',
    component: VerordenEmpleadoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VerordenEmpleadoPageRoutingModule {}
