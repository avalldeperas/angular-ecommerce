import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Product} from '../common/product';
import {map} from 'rxjs/operators';
import {ProductCategory} from '../common/product-category';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = "http://localhost:8080/api/";

  constructor(private httpClient: HttpClient) { }

  getProductList(currentCategoryId: number): Observable<Product[]> {
    const searchUrl = `${this.baseUrl}products/search/findByCategoryId?id=${currentCategoryId}`;
    console.log("getProducts() - url = " + searchUrl);
    return this.getProducts(searchUrl);
  }

  getSearchProducts(keyword: string): Observable<Product[]> {
    const searchUrl = `${this.baseUrl}products/search/findByNameContaining?name=${keyword}`;
    console.log("getSearchProducts - searchUrl = " + searchUrl);
    return this.getProducts(searchUrl);
  }

  private getProducts(searchUrl: string) {
    return this.httpClient.get<GetProductsResponse>(searchUrl).pipe(
      map(response => response._embedded.products)
    );
  }

  getProductCategories(): Observable<ProductCategory[]> {
    const categoriesUrl = `${this.baseUrl}product-category`;
    console.log("inside getProductCategories - url = " + categoriesUrl);
    return this.httpClient.get<GetProductCategoriesResponse>(categoriesUrl).pipe(
      map( response => response._embedded.productCategory)
    );
  }
}

// unwraps the JSON gathered from API _embedded entry
interface GetProductsResponse {
  _embedded: {
    products: Product[];
  };
}

interface GetProductCategoriesResponse {
  _embedded: {
    productCategory: ProductCategory[];
  };
}
