import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Sms } from '@module/models';
import { InvalidOperationException } from '@module/utils/internal';
import { Observable } from 'rxjs';

const API_URL = 'api/envio-sms';

@Injectable({ providedIn: 'root' })
export class SendSmsRepository {
  constructor(private httpCliente: HttpClient) {}

  sendSms(sms: Sms): Observable<Sms> {
    if (!sms) throw new InvalidOperationException('sms');
    return this.httpCliente.post<Sms>(API_URL, sms);
  }
}
