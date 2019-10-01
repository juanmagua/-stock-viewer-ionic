import { Component, OnInit } from '@angular/core';
import { StockService } from '../../services/stock.service';
import { ProductoService } from '../../services/producto.service';
import { NavController } from '@ionic/angular';
import { AppRoutingModule } from '../../app-routing.module';
import { LoadingController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-stock-propio',
  templateUrl: './stock-propio.page.html',
  styleUrls: ['./stock-propio.page.scss'],
})
export class StockPropioPage implements OnInit {

  stockPropio: Array<any> = [];
  producto: string;
  loading: any;
  _producto: any;
  

 
  constructor(private route: ActivatedRoute, public loadingController: LoadingController,private router: AppRoutingModule, private stockService: StockService, private productoService: ProductoService, private navCtrl: NavController) { }
  
  

  ngOnInit() {

    this.producto =  this.route.snapshot.paramMap.get('id');
    this._producto = this.getProducto(this.producto);
   


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

    this.loading = await this.loadingController.create({ message: "Cargando Stock Propio.." });
    
    this.loading.present();
  
    new Promise(resolve => {
      this.stockService.getStockPropio(this.producto)
          .subscribe((stockPropio: any) => {
            console.log(stockPropio);
            this.stockPropio = stockPropio;
            this.loading.dismiss();
           }, 
          err => { console.log(err);});
      });
  }

}
