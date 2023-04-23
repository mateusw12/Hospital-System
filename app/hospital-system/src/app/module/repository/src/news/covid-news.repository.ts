import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CovidNews, HeathPlan, Patient } from '@module/models';
import { InvalidOperationException } from '@module/utils/internal';
import { Observable } from 'rxjs';

const API_URL = 'api/covid/noticias';

@Injectable({ providedIn: 'root' })
export class CovidNewsRepository {
  constructor(private httpCliente: HttpClient) {}

  findNews(): Observable<CovidNews> {
    return this.httpCliente.get<CovidNews>(`${API_URL}`);
  }
}
