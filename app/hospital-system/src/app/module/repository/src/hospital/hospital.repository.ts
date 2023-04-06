import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Hospital } from '@module/models';
import { InvalidOperationException } from '@module/utils/internal';
import { Observable } from 'rxjs';

const API_URL = 'api/cadastro/hospital';

@Injectable({ providedIn: 'root' })
export class HospitalRepository {
  constructor(private httpCliente: HttpClient) {}

  add(hospital: Hospital): Observable<void> {
    if (!hospital) throw new InvalidOperationException('hospital');
    return this.httpCliente.post<void>(API_URL, hospital);
  }

  findById(id: number): Observable<Hospital> {
    if (!id) throw new InvalidOperationException('id');
    return this.httpCliente.get<Hospital>(`${API_URL}/${id}`);
  }

  findAll(): Observable<Hospital[]> {
    return this.httpCliente.get<Hospital[]>(`${API_URL}`);
  }

  updateById(hospital: Hospital): Observable<void> {
    if (!hospital) throw new InvalidOperationException('hospital');
    return this.httpCliente.put<void>(`${API_URL}/${hospital.id}`, hospital);
  }

  deleteById(id: number): Observable<void> {
    if (!id) throw new InvalidOperationException('id');
    return this.httpCliente.delete<void>(`${API_URL}/${id}`);
  }
}
