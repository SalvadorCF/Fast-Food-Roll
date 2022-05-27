import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VerordenEmpleadoPageRoutingModule } from './verorden-empleado-routing.module';

import { VerordenEmpleadoPage } from './verorden-empleado.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VerordenEmpleadoPageRoutingModule
  ],
  declarations: [VerordenEmpleadoPage]
})
export class VerordenEmpleadoPageModule {}
