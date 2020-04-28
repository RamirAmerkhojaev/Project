import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Comment} from '../entities/comment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  public addComment(product_id: number, comment: string): Observable<Comment> {
    return this.http.post<Comment>(`${this.apiUrl}/app/comments`, {
      product_id,
      comment
    });
  }

  public getComments(categoryId: number, productId: number): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this.apiUrl}/app/categories/${categoryId}/products/${productId}/comments`);
  }

  public deleteComment(commentId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/app/comments/${commentId}`);
  }

  public updateComment(commentId: number, comment: string , product_id: number): Observable<Comment> {
    return this.http.put<Comment>(`${this.apiUrl}/app/comments/${commentId}`, {
      comment,
      product_id
    });
  }
}
