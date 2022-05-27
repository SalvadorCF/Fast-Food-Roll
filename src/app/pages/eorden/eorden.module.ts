import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EordenPageRoutingModule } from './eorden-routing.module';

import { EordenPage } from './eorden.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EordenPageRoutingModule
  ],
  declarations: [EordenPage]
})
export class EordenPageModule {}
