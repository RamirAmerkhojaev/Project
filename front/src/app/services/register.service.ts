import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {IAuthResponse, User} from '../entities/register';



@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http: HttpClient) {
  }

  private apiUrl = environment.apiUrl;

  signup(user: User): Observable<IAuthResponse>{
    const body = {username: user.username, password: user.password, email: user.email}
    return this.http.post<IAuthResponse>(`${this.apiUrl}/app/signup/`, body );
  }

  login(username, password): Observable<IAuthResponse> {
    return this.http.post<IAuthResponse>(`${this.apiUrl}/app/login/`, {
      username,
      password
    });
  }


}
