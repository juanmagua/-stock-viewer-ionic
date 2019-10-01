import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { StockEnTransitoPage } from './stock-en-transito.page';

const routes: Routes = [
  {
    path: '',
    component: StockEnTransitoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [StockEnTransitoPage]
})
export class StockEnTransitoPageModule {}
