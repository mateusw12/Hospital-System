import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Disiase } from '@module/models';
import { InvalidOperationException } from '@module/utils/internal';
import { Observable } from 'rxjs';

const API_URL = 'api/cadastro/doencas';

@Injectable({ providedIn: 'root' })
export class DisiaseRepository {
  constructor(private httpCliente: HttpClient) {}

  add(disiase: Disiase): Observable<void> {
    if (!disiase) throw new InvalidOperationException('disiase');
    return this.httpCliente.post<void>(API_URL, disiase);
  }

  findById(id: number): Observable<Disiase> {
    if (!id) throw new InvalidOperationException('id');
    return this.httpCliente.get<Disiase>(`${API_URL}/${id}`);
  }

  findAll(): Observable<Disiase[]> {
    return this.httpCliente.get<Disiase[]>(`${API_URL}`);
  }

  updateById(disiase: Disiase): Observable<void> {
    if (!disiase) throw new InvalidOperationException('disiase');
    return this.httpCliente.put<void>(`${API_URL}/${disiase.id}`, disiase);
  }

  deleteById(id: number): Observable<void> {
    if (!id) throw new InvalidOperationException('id');
    return this.httpCliente.delete<void>(`${API_URL}/${id}`);
  }
}
