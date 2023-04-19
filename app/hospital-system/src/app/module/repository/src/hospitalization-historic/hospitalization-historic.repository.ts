import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HospitalizationHistoric } from '@module/models';
import { InvalidOperationException } from '@module/utils/internal';
import { Observable } from 'rxjs';

const API_URL = 'api/cadastro/internacao-historico';

@Injectable({ providedIn: 'root' })
export class HospitalizationHistoricRepository {
  constructor(private httpCliente: HttpClient) {}

  add(hospitalizationHistoric: HospitalizationHistoric): Observable<void> {
    if (!hospitalizationHistoric)
      throw new InvalidOperationException('hospitalizationHistoric');
    return this.httpCliente.post<void>(API_URL, hospitalizationHistoric);
  }

  findById(id: number): Observable<HospitalizationHistoric> {
    if (!id) throw new InvalidOperationException('id');
    return this.httpCliente.get<HospitalizationHistoric>(`${API_URL}/${id}`);
  }

  findAll(): Observable<HospitalizationHistoric[]> {
    return this.httpCliente.get<HospitalizationHistoric[]>(`${API_URL}`);
  }

  updateById(
    hospitalizationHistoric: HospitalizationHistoric
  ): Observable<void> {
    if (!hospitalizationHistoric)
      throw new InvalidOperationException('hospitalizationHistoric');
    return this.httpCliente.put<void>(
      `${API_URL}/${hospitalizationHistoric.id}`,
      hospitalizationHistoric
    );
  }

  deleteById(id: number): Observable<void> {
    if (!id) throw new InvalidOperationException('id');
    return this.httpCliente.delete<void>(`${API_URL}/${id}`);
  }
}
