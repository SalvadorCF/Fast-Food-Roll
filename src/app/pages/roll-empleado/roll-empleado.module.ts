import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RollEmpleadoPageRoutingModule } from './roll-empleado-routing.module';

import { RollEmpleadoPage } from './roll-empleado.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RollEmpleadoPageRoutingModule
  ],
  declarations: [RollEmpleadoPage]
})
export class RollEmpleadoPageModule {}
