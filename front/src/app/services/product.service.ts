import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Product} from '../entities/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  public getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/app/products`);
  }

  public getProductsById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/app/products/${id}`);
  }

  public addToBasket(id: number): Observable<Product> {
    return this.http.patch<Product>(`${this.apiUrl}/app/products/${id}`, {});
  }
}
