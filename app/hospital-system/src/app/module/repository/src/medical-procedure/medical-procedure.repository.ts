import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MedicalProcedure, User } from '@module/models';
import { InvalidOperationException } from '@module/utils/internal';
import { Observable } from 'rxjs';

const API_URL = 'api/cadastro/procedimento';

@Injectable({ providedIn: 'root' })
export class MedicalProcedureRepository {
  constructor(private httpCliente: HttpClient) {}

  add(medicalProcedure: MedicalProcedure): Observable<void> {
    if (!medicalProcedure)
      throw new InvalidOperationException('medicalProcedure');
    return this.httpCliente.post<void>(API_URL, medicalProcedure);
  }

  findById(id: number): Observable<MedicalProcedure> {
    if (!id) throw new InvalidOperationException('id');
    return this.httpCliente.get<MedicalProcedure>(`${API_URL}/${id}`);
  }

  findAll(): Observable<MedicalProcedure[]> {
    return this.httpCliente.get<MedicalProcedure[]>(`${API_URL}`);
  }

  updateById(medicalProcedure: MedicalProcedure): Observable<void> {
    if (!medicalProcedure)
      throw new InvalidOperationException('medicalProcedure');
    return this.httpCliente.put<void>(
      `${API_URL}/${medicalProcedure.id}`,
      medicalProcedure
    );
  }

  deleteById(id: number): Observable<void> {
    if (!id) throw new InvalidOperationException('id');
    return this.httpCliente.delete<void>(`${API_URL}/${id}`);
  }
}
