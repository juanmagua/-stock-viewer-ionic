import { Component, OnInit } from '@angular/core';
import { StockService } from '../../services/stock.service';
import { ProductoService } from '../../services/producto.service';
import { NavController } from '@ionic/angular';
import { AppRoutingModule } from '../../app-routing.module';
import { LoadingController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-unidades-pedidas',
  templateUrl: './unidades-pedidas.page.html',
  styleUrls: ['./unidades-pedidas.page.scss'],
})
export class UnidadesPedidasPage implements OnInit {

  unidadesPedidas: Array<any> = [];
  _producto: any;
  producto: string;
  loading: any;

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

            this.getUnidadesPedidas();


           }, 
          err => { console.log(err);});
      });
    } 

  async getUnidadesPedidas(){
    
    
    this.loading = await this.loadingController.create({ message: "Cargando Unidades Pedidas.." });
    
    this.loading.present();
  
    new Promise(resolve => {
      this.stockService.getUnidadesPedidas(this.producto)
          .subscribe((unidadesPedidas: any) => {
            console.log(unidadesPedidas);
            this.unidadesPedidas = unidadesPedidas;
            this.loading.dismiss();
           }, 
          err => { console.log(err);});
      });

  }

}
