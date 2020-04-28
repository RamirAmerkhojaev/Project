import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {Category} from '../entities/category';
import {Product} from '../entities/product';


@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  public getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.apiUrl}/app/categories`);
  }

  public getProductsByCategory(id: number): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/app/categories/${id}/products`);
  }
}
