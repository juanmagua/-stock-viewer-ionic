import { Component } from '@angular/core';
import { MarcaService } from '../services/marca.service';
import { ProductoService } from '../services/producto.service';
import { CategoriaService } from '../services/categoria.service';
import { StockService } from '../services/stock.service';
import { NavController } from '@ionic/angular';
import { AppRoutingModule } from '../app-routing.module';
import { LoadingController } from '@ionic/angular';
import { IonicSelectableComponent } from 'ionic-selectable';
import { Subscription } from 'rxjs';
import { Producto } from '../types';
import { ViewChild } from '@angular/core';
import { containerRefreshEnd } from '@angular/core/src/render3';
import { delay } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';



@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
  

export class HomePage {

  @ViewChild(IonicSelectableComponent) productoComponent: IonicSelectableComponent;

  //@vars
  marca: string;
  categoria: string;
  
  marcas: any;
  categorias: any;
  
  productosIsEnabled: boolean;
  unidadesPedidas: number;
  stockPropio: number;
  stockTransito: number;
  enCorte: number;
  estadoStock: number;
  estadoStockClass: string;

  //
  productos: Producto[];
  producto: Producto;
  productosSubscription: Subscription;
  page = 2;

 
  //
  loading: any;
  loading2: any;

  constructor(private authenticationService: AuthenticationService, public loadingController: LoadingController,private router: AppRoutingModule, private stockService: StockService,private marcaService: MarcaService, private productoService: ProductoService, private categoriaService: CategoriaService, private navCtrl: NavController){
  
  }

   // When Logout Button is pressed 
   logout() {
    this.authenticationService.logout();
   }

  async presentLoading(_message) {
    const loading = await this.loadingController.create({
      message: _message,
      duration: 2000
    });
    await loading.present();

  }

  async loadingHide(){

    this.loadingController.dismiss();
  }

  
  //
  ngOnInit() {

    this.estadoStockClass = "estado-stock"

    //this.marca = null;
    //this.categoria = null;
    //this.producto = null;

    this.unidadesPedidas= 0;
    this.stockPropio= 0;
    this.stockTransito= 0;
    this.enCorte= 0;
    this.estadoStock = 0;
    

    //

    

    this.getCategorias();
    this.getMarcas();


  }

  async getCategorias(){

    

      
  }

  async getMarcas(){

    this.loading =  await this.loadingController.create({
      message: "Cargando Marcas y Categorias.. ",
      duration: 2000
    });
    
    this.loading.present();



      this.marcaService.getMarcas()
          .subscribe((marcas: any) => {
            this.marcas = marcas;

            this.categoriaService.getCategorias()
            .subscribe((categorias: any) => {
              this.categorias = categorias;
              this.loading.dismiss();
            }, 
            err => { console.log(err);}); 
          }, 
          err => { console.log(err);});

  }

  async onCategoriaSelected()
	{
    
    this.producto = null;
    this.unidadesPedidas = 0;
    this.stockPropio = 0;
    this.stockTransito = 0;
    this.enCorte = 0;
    this.estadoStock = 0;
    this.estadoStockClass = "estado-stock"
    this.clearSearch();

    
    this.loading = await this.loadingController.create({ message: "Cargando Productos" });
    
    this.loading.present();
    
    new Promise(resolve => {
       this.productoService.getProductos(this.marca, this.categoria)
          .subscribe((productos: any) => {
            this.productos = productos;
            this.loading.dismiss();
          }, 
          err => { console.log(err);});
      });
   
          
  }

  onMarcaSelected()
	{
    this.producto = null;
    this.categoria = null;
    this.unidadesPedidas = 0;
    this.stockPropio = 0;
    this.stockTransito = 0;
    this.enCorte = 0;
    this.estadoStock = 0;
    this.estadoStockClass = "estado-stock"
    this.clearSearch();

    /*
    this.presentLoading('Cargando Productos..');
    await new Promise(resolve => {
       this.productoService.getProductos(this.marca, this.categoria)
          .subscribe((productos: any) => {
            this.productos = productos;
          }, 
          err => { console.log(err);});
      });*/
    
  }

  /*
  *
  *  Filtrar 
  */
  async onFiltrar(){


  
  this.loading = await this.loadingController.create({ message: "Cargando Stock.." });
    
  this.loading.present();
    

  new Promise(resolve => {
    this.stockService.getStock(this.producto.Id)
        .subscribe((stock: any) => {
          this.unidadesPedidas = stock.unidadesPedidas;
          this.stockPropio = stock.stockPropio;
          this.stockTransito = stock.stockTransito;
          this.enCorte = stock.enCorte;
          this.estadoStock = stock.estadoStock;
          if(this.estadoStock < 0){
            this.estadoStockClass = "estado-stock-no-ok"
          }else{
            this.estadoStockClass = "estado-stock-ok"
        
          }
          this.loading.dismiss();
  
        }, 
        err => { console.log(err);});
    });
  }

 
  /*
   *
   */

   onRedirect(page){
      console.log("Redirect: " + page + this.producto.Id);
      this.navCtrl.navigateForward(page + this.producto.Id);

     
   }

   // Searcheable
   filterProductos(productos: Producto[], text: string) {
    return productos.filter(producto => {
      return producto.Nombre.toLowerCase().indexOf(text) !== -1 ||
        producto.Id.toString().toLowerCase().indexOf(text) !== -1;
    });
  }

  clearSearch() {
    this.productoComponent.clear();
    console.log(this.productoComponent.searchText);
    this.productoComponent.searchText = "";


  }
  
  
  
  getProductos(page?: number, size?: number): Producto[] {
      
    let productos;

    productos = this.productos;
  
    if (page && size) {
      productos = productos.slice((page - 1) * size, ((page - 1) * size) + size);
    }

    return productos;   
  }

  getProductossAsync(page?: number, size?: number, timeout = 4000): Observable<Producto[]> {
    return new Observable<Producto[]>(observer => {
      observer.next(this.getProductos(page, size));
      observer.complete();
    }).pipe(delay(timeout));
  }


  productoChange(event: {
    component: IonicSelectableComponent,
    value: any
  }) {

    let producto = event.value;

    this.unidadesPedidas = 0;
    this.stockPropio = 0;
    this.stockTransito = 0;
    this.enCorte = 0;
    this.estadoStock = 0;
    this.estadoStockClass = "estado-stock"

  }

  searchProductos(event: {
    component: IonicSelectableComponent,
    text: string
  }) {
      let text = event.text.trim().toLowerCase();

      console.log('inicialzia el buscar');

    //this.productoComponent.label = 'Productos';
    
        event.component.startSearch();

        // Close any running subscription.
        if (this.productosSubscription) {
          this.productosSubscription.unsubscribe();
        }

        console.log("aca text",!text);

        if (!text) {
          console.log("acaa text");
        
          // Close any running subscription.
        if (this.productosSubscription) {
          this.productosSubscription.unsubscribe();
        }

        event.component.items = this.getProductos(1, 15);
      
        // Enable and start infinite scroll from the beginning.
        this.page = 2;
        event.component.endSearch();
        event.component.enableInfiniteScroll();
        return;
      }

      if(text.length >= 3){
     
        this.productosSubscription =  this.getProductossAsync().subscribe(productos => {
      
        console.log('busca asyc');

        // Subscription will be closed when unsubscribed manually.
        if (this.productosSubscription.closed) {
          return;
        }

      
        event.component.items = this.filterProductos(productos, text);
        event.component.endSearch();
        });
      }
  }

  getNumberOfPages(numberPerPage) {
    return Math.ceil(this.productos.length / numberPerPage);
  }

  getMoreProductos(event: {
    component: IonicSelectableComponent,
    text: string
  }) {
    let text = (event.text || '').trim().toLowerCase();
    let numberOfPages = this.getNumberOfPages(15);

    console.log(this.page ,'more productos');
      

    // There're no more ports - disable infinite scroll.
    if (this.page > numberOfPages) {
      event.component.disableInfiniteScroll();
      return;
    }

    this.getProductossAsync(this.page, 15).subscribe(productos => {
      productos = event.component.items.concat(productos);

      if (text) {
        productos = this.filterProductos(productos, text);
      }

      event.component.items = productos;
      event.component.endInfiniteScroll();
      this.page++;
    });
  }

}
