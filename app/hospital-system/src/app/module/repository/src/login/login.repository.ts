import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login, UserToken } from '@module/models';
import { InvalidOperationException } from '@module/utils/internal';
import { Observable } from 'rxjs';

const API_URL = 'api/autenticacao';

@Injectable({ providedIn: 'root' })
export class LoginRepository {
  constructor(private httpCliente: HttpClient) {}

  login(login: Login): Observable<UserToken> {
    if (!login) throw new InvalidOperationException('login');
    return this.httpCliente.post<UserToken>(`${API_URL}/login`, login);
  }

  logout(login: Login): Observable<UserToken> {
    if (!login) throw new InvalidOperationException('login');
    return this.httpCliente.post<UserToken>(`${API_URL}/logout`, login);
  }
}
