import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { UnidadesPedidasPage } from './unidades-pedidas.page';

const routes: Routes = [
  {
    path: '',
    component: UnidadesPedidasPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [UnidadesPedidasPage]
})
export class UnidadesPedidasPageModule {}
