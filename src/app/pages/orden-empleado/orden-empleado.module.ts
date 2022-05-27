import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrdenEmpleadoPageRoutingModule } from './orden-empleado-routing.module';

import { OrdenEmpleadoPage } from './orden-empleado.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OrdenEmpleadoPageRoutingModule
  ],
  declarations: [OrdenEmpleadoPage]
})
export class OrdenEmpleadoPageModule {}
