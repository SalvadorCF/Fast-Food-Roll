import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrdeneEmpleadoPageRoutingModule } from './ordene-empleado-routing.module';

import { OrdeneEmpleadoPage } from './ordene-empleado.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OrdeneEmpleadoPageRoutingModule
  ],
  declarations: [OrdeneEmpleadoPage]
})
export class OrdeneEmpleadoPageModule {}
