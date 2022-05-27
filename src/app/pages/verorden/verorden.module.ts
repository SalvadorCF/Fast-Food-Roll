import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VerordenPageRoutingModule } from './verorden-routing.module';

import { VerordenPage } from './verorden.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VerordenPageRoutingModule
  ],
  declarations: [VerordenPage]
})
export class VerordenPageModule {}
