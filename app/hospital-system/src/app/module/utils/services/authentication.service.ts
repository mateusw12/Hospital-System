import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { UserToken } from '@module/models';
import { Observable } from 'rxjs';
import { chain } from '../functions/date';
import { InvalidOperationException } from '../internal';
import { LocalStorageService } from './local-storage.service';

const API_URL = 'api/autenticacao';

@Injectable({ providedIn: 'root' })
export class AuthenticationService implements OnDestroy {
  constructor(
    private localStorageService: LocalStorageService,
    private httpCliente: HttpClient
  ) {}

  isTokenValid(): Observable<boolean> {
    const userToken = this.getUserToken();
    if (!userToken) throw new InvalidOperationException('userToken');
    return this.httpCliente.post<boolean>(`${API_URL}/valid-token`, userToken);
  }

  setUserToken(userToken: UserToken): void {
    this.localStorageService.setItem('token', userToken.token);
    this.localStorageService.setItem('user', userToken.userName);
    this.localStorageService.setItem(
      'expirationDate',
      new Date(userToken.expirationDate).toString()
    );
  }

  getToken(): string | null {
    return this.localStorageService.getItem('token');
  }

  getUser(): string | null {
    return this.localStorageService.getItem('user');
  }

  getExpirationDate(): string | null {
    return this.localStorageService.getItem('expirationDate');
  }

  removeUserToken(key: string): void {
    this.localStorageService.removeItem(key);
  }

  clearUserToken(): void {
    this.localStorageService.clear();
  }

  getUserToken(): UserToken {
    const token = this.localStorageService.getItem('token') as string;
    const user = this.localStorageService.getItem('user') as string;
    const expirationDate = chain(
      this.localStorageService.getItem('expirationDate'),
      'dd//MM/yyyy'
    ).toDate();

    const model = new UserToken();
    model.expirationDate = expirationDate;
    model.token = token;
    model.userName = user;
    return model;
  }

  ngOnDestroy(): void {}
}
