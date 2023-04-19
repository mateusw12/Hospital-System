import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Hospitalization } from '@module/models';
import { InvalidOperationException } from '@module/utils/internal';
import { Observable } from 'rxjs';

const API_URL = 'api/cadastro/internacao';

@Injectable({ providedIn: 'root' })
export class HospitalizationRepository {
  constructor(private httpCliente: HttpClient) {}

  add(hospitalization: Hospitalization): Observable<void> {
    if (!hospitalization)
      throw new InvalidOperationException('hospitalization');
    return this.httpCliente.post<void>(API_URL, hospitalization);
  }

  findById(id: number): Observable<Hospitalization> {
    if (!id) throw new InvalidOperationException('id');
    return this.httpCliente.get<Hospitalization>(`${API_URL}/${id}`);
  }

  findAll(): Observable<Hospitalization[]> {
    return this.httpCliente.get<Hospitalization[]>(`${API_URL}`);
  }

  updateById(hospitalization: Hospitalization): Observable<void> {
    if (!hospitalization)
      throw new InvalidOperationException('hospitalization');
    return this.httpCliente.put<void>(
      `${API_URL}/${hospitalization.id}`,
      hospitalization
    );
  }

  deleteById(id: number): Observable<void> {
    if (!id) throw new InvalidOperationException('id');
    return this.httpCliente.delete<void>(`${API_URL}/${id}`);
  }
}
