import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PrincipaldPageRoutingModule } from './principald-routing.module';

import { PrincipaldPage } from './principald.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PrincipaldPageRoutingModule
  ],
  declarations: [PrincipaldPage]
})
export class PrincipaldPageModule {}
