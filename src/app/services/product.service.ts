import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Product} from '../common/product';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = "http://localhost:8080/api/";

  constructor(private httpClient: HttpClient) { }

  getProductList(): Observable<Product[]> {
    const url = this.baseUrl + "products";
    console.log("getProducts() - url = " + url);
    this.httpClient.get<any>(url).subscribe(x => console.log("value = ", x));
    return this.httpClient.get<GetResponse>(url).pipe(
      map(response => response._embedded.products)
    );
  }
}

// unwraps the JSON gathered from API _embedded entry
interface GetResponse {
  _embedded: {
    products: Product[];
  };
}
