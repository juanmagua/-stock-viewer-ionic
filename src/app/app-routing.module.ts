import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { IonicStorageModule } from '@ionic/storage';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', canActivate: [AuthGuard],loadChildren: './home/home.module#HomePageModule'},
  { path: 'stock-en-transito/:id', canActivate: [AuthGuard], loadChildren: './pages/stock-en-transito/stock-en-transito.module#StockEnTransitoPageModule' },
  { path: 'stock-propio/:id', canActivate: [AuthGuard], loadChildren: './pages/stock-propio/stock-propio.module#StockPropioPageModule' },
  { path: 'stock-en-corte/:id', canActivate: [AuthGuard], loadChildren: './pages/stock-en-corte/stock-en-corte.module#StockEnCortePageModule' },
  { path: 'unidades-pedidas/:id', canActivate: [AuthGuard], loadChildren: './pages/unidades-pedidas/unidades-pedidas.module#UnidadesPedidasPageModule' },
  { path: 'login', loadChildren: './auth/login/login.module#LoginPageModule' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), IonicStorageModule.forRoot()],
  exports: [RouterModule],
})
export class AppRoutingModule { }
