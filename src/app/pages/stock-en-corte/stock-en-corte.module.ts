import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { StockEnCortePage } from './stock-en-corte.page';

const routes: Routes = [
  {
    path: '',
    component: StockEnCortePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [StockEnCortePage]
})
export class StockEnCortePageModule {}
