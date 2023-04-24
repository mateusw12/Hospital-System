import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CovidNews } from '@module/models';
import { Observable } from 'rxjs';

const API_URL = 'api/covid/noticias';

@Injectable({ providedIn: 'root' })
export class CovidNewsRepository {
  constructor(private httpCliente: HttpClient) {}

  findNews(): Observable<CovidNews> {
    return this.httpCliente.get<CovidNews>(`${API_URL}`);
  }
}
