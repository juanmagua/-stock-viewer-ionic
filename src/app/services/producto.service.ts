import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment, SERVER_URL } from '../../environments/environment';
import { delay } from 'rxjs/operators';
import { Producto } from '../types';


@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  url = SERVER_URL + '/Productos';
  apiKey = ''; // <-- Enter your own key here!


  constructor(private http: HttpClient) { }
    
    productos: any;  
    producto: any

    getProductos(IdMarca: string, IdCategoria: string): Observable<any> {
      return this.http.get(`${this.url}/${IdMarca}/${IdCategoria}`);
    } 

    getProducto(Id: string): Observable<any> {
      return this.http.get(`${this.url}/${Id}`);
    } 

      
}
