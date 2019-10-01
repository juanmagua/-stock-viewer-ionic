import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment, SERVER_URL } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class MarcaService {

  url = SERVER_URL + '/Marcas';
  apiKey = ''; // <-- Enter your own key here!


  constructor(private http: HttpClient) { }

    getMarcas(): Observable<any> {
      return this.http.get(this.url);
    }

  
}
