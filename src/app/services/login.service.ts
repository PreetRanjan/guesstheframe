import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient) {}

  Login(creds) {
    return this.http.post(
      'https://guessthemovieapi.azurewebsites.net/api/Login/',
      creds
    );
  }
}
