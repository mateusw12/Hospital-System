import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Email } from '@module/models';
import { InvalidOperationException } from '@module/utils/internal';
import { Observable } from 'rxjs';

const API_URL = 'api/envio-email';

@Injectable({ providedIn: 'root' })
export class SendEmailRepository {
  constructor(private httpCliente: HttpClient) {}

  sendEmail(email: Email): Observable<Email> {
    if (!email) throw new InvalidOperationException('email');
    return this.httpCliente.post<Email>(API_URL, email);
  }
}
