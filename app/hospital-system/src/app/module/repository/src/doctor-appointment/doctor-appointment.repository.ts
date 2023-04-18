import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DoctorAppointment } from '@module/models';
import { InvalidOperationException } from '@module/utils/internal';
import { Observable } from 'rxjs';

const API_URL = 'api/cadastro/consulta-medica';

@Injectable({ providedIn: 'root' })
export class DoctorAppointmentRepository {
  constructor(private httpCliente: HttpClient) {}

  add(doctorAppointment: DoctorAppointment): Observable<void> {
    if (!doctorAppointment)
      throw new InvalidOperationException('doctorAppointment');
    return this.httpCliente.post<void>(API_URL, doctorAppointment);
  }

  findById(id: number): Observable<DoctorAppointment> {
    if (!id) throw new InvalidOperationException('id');
    return this.httpCliente.get<DoctorAppointment>(`${API_URL}/${id}`);
  }

  findAll(hospitalId: number): Observable<DoctorAppointment[]> {
    if (!hospitalId) throw new InvalidOperationException('hospitalId');
    return this.httpCliente.get<DoctorAppointment[]>(`${API_URL}/hospital/${hospitalId}`);
  }

  updateById(doctorAppointment: DoctorAppointment): Observable<void> {
    if (!doctorAppointment)
      throw new InvalidOperationException('doctorAppointment');
    return this.httpCliente.put<void>(
      `${API_URL}/${doctorAppointment.id}`,
      doctorAppointment
    );
  }

  deleteById(id: number): Observable<void> {
    if (!id) throw new InvalidOperationException('id');
    return this.httpCliente.delete<void>(`${API_URL}/${id}`);
  }
}
