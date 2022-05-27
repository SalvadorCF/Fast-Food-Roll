import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PerfilempleadoPageRoutingModule } from './perfilempleado-routing.module';

import { PerfilempleadoPage } from './perfilempleado.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PerfilempleadoPageRoutingModule
  ],
  declarations: [PerfilempleadoPage]
})
export class PerfilempleadoPageModule {}
