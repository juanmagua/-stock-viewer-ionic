import { Component, OnInit } from '@angular/core';
import { StockService } from '../../services/stock.service';
import { ProductoService } from '../../services/producto.service';
import { NavController } from '@ionic/angular';
import { AppRoutingModule } from '../../app-routing.module';
import { LoadingController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { analyzeFileForInjectables } from '@angular/compiler';

@Component({
  selector: 'app-stock-en-corte',
  templateUrl: './stock-en-corte.page.html',
  styleUrls: ['./stock-en-corte.page.scss'],
})
export class StockEnCortePage implements OnInit {

  stockCorte: Array<any> = [];
  loaderToShow: any;
  producto: string;
  loading : any;
  _producto: any;

 
  constructor(private route: ActivatedRoute, public loadingController: LoadingController,private router: AppRoutingModule, private stockService: StockService, private productoService: ProductoService, private navCtrl: NavController) { }

  

  ngOnInit() {

    this.producto =  this.route.snapshot.paramMap.get('id');
    this._producto = this.getProducto(this.producto)


  }

  async getProducto(Id){
    
    
    this.loading = await this.loadingController.create({ message: "Cargando Producto.." });
    
    this.loading.present();
  
    new Promise(resolve => {
      this.productoService.getProducto(this.producto)
          .subscribe((producto: any) => {
            
            console.log(producto);
            
            this._producto = producto;
            
            this.loading.dismiss();

            this.getStock();


           }, 
          err => { console.log(err);});
      });
    } 

  async getStock(){

    this.loading = await this.loadingController.create({ message: "Cargando Stock en Corte.." });
    
    this.loading.present();
  
    new Promise(resolve => {
      this.stockService.getStockCorte(this.producto)
          .subscribe((stockCorte: any) => {
            console.log(stockCorte);
            this.stockCorte = stockCorte;
            this.loading.dismiss();
           }, 
          err => { console.log(err);});
      });


  }

}
