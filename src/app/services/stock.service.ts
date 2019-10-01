import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment, SERVER_URL } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class StockService {

  url = SERVER_URL + '/Stock';
  apiKey = ''; // <-- Enter your own key here!

  constructor(private http: HttpClient) { }

    /*
    *
    *  Get Stock Inicial de la Home
    */
      
    getStock(producto: string): Observable<any> {
      this.url = SERVER_URL + '/Stock'
      return this.http.get(`${this.url}/${producto}`);
    }

    getUnidadesPedidas(id) {
      this.url = SERVER_URL + '/UnidadesPedidas'
      return this.http.get(`${this.url}/${id}`);
    }

    getStockPropio(id) {
      this.url = SERVER_URL + '/StockPropio'
      return this.http.get(`${this.url}/${id}`);
    }

    
    getStockCorte(id) {
      this.url = SERVER_URL + '/StockCorte'
      return this.http.get(`${this.url}/${id}`);
    }

    
    getStockTransito(id) {
      this.url = SERVER_URL + '/StockTransito'
      return this.http.get(`${this.url}/${id}`);
    }


  
}
