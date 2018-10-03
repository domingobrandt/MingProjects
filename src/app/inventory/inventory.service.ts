import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions }          from '@angular/http';
import { Inventory }     from './inventory';
import { Observable }     from 'rxjs';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/catch';


@Injectable({
  providedIn: 'root'
})
export class InventoryService {
private headers = new Headers({'Content-Type': 'application/json'});
private url = 'http://localhost:8000/inventario';
  constructor(private http : Http) { }

  getInventories(): Observable<Inventory[]>{
    let url = `${this.url}`;
    return this.http.get(url)
                    .map(r => r.json())
                    .catch(this.handleError);
  }

  
  getInventory(id: number): Observable<Inventory[]> {
    let url = `${this.url}/${id}`;
    return this.http.get(url, {headers: this.headers})
                    .first()
                    .map(res => res.json())
                    .catch(this.handleError);;
  }

  addInventory (inventory: Inventory) {
    let url = `${this.url}`;
    let iJson = JSON.stringify(inventory);
    return this.http.post(url, iJson, {headers: this.headers})
                    .map(response => response.json())
                    .catch(this.handleError);;
  }

  putInventory (inventory: Inventory) {
    let url = `${this.url}`;
    let iJson = JSON.stringify(inventory);
    return this.http.put(url, iJson, {headers: this.headers})
                    .map(response => response.json())
                    .catch(this.handleError);;
  }

  delInventory (id: number) {
    let url = `${this.url}/${id}`;
    return this.http.delete(url, {headers: this.headers})
                    .map(res => res.json())
                    .catch(this.handleError);;
  }
  private handleError (error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      let body = error.json() || '';
      let err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}
