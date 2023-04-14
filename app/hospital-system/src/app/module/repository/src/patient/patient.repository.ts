import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HeathPlan, Patient } from '@module/models';
import { InvalidOperationException } from '@module/utils/internal';
import { Observable } from 'rxjs';

const API_URL = 'api/cadastro/paciente';

@Injectable({ providedIn: 'root' })
export class PatientRepository {
  constructor(private httpCliente: HttpClient) {}

  add(patient: Patient): Observable<void> {
    if (!patient) throw new InvalidOperationException('patient');
    return this.httpCliente.post<void>(API_URL, patient);
  }

  findById(id: number): Observable<Patient> {
    if (!id) throw new InvalidOperationException('id');
    return this.httpCliente.get<Patient>(`${API_URL}/${id}`);
  }

  findByHeathPlan(heathPlan: HeathPlan): Observable<Patient[]> {
    if (!heathPlan) throw new InvalidOperationException('heathPlan');
    return this.httpCliente.get<Patient[]>(
      `${API_URL}/heath-plan/${heathPlan}`
    );
  }

  findByHasHeathPlan(): Observable<Patient[]> {
    return this.httpCliente.get<Patient[]>(`${API_URL}/heath-plan`);
  }

  findAll(hospitalId: number): Observable<Patient[]> {
    if (!hospitalId) throw new InvalidOperationException('hospitalId');
    return this.httpCliente.get<Patient[]>(`${API_URL}/hospital/${hospitalId}`);
  }

  updateById(patient: Patient): Observable<void> {
    if (!patient) throw new InvalidOperationException('patient');
    return this.httpCliente.put<void>(`${API_URL}/${patient.id}`, patient);
  }

  deleteById(id: number): Observable<void> {
    if (!id) throw new InvalidOperationException('id');
    return this.httpCliente.delete<void>(`${API_URL}/${id}`);
  }
}
