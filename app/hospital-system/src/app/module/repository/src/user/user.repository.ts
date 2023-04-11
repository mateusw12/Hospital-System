import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '@module/models';
import { InvalidOperationException } from '@module/utils/internal';
import { Observable } from 'rxjs';

const API_URL = 'api/cadastro/usuario';

@Injectable({ providedIn: 'root' })
export class UserRepository {
  constructor(private httpCliente: HttpClient) {}

  add(user: User): Observable<void> {
    if (!user) throw new InvalidOperationException('user');
    return this.httpCliente.post<void>(API_URL, user);
  }

  findById(id: number): Observable<User> {
    if (!id) throw new InvalidOperationException('id');
    return this.httpCliente.get<User>(`${API_URL}/${id}`);
  }

  findMe(): Observable<User> {
    return this.httpCliente.get<User>(`${API_URL}/me`);
  }

  findAll(): Observable<User[]> {
    return this.httpCliente.get<User[]>(`${API_URL}`);
  }

  findByHospitalId(hospitalId: number): Observable<User[]> {
    if (!hospitalId) throw new InvalidOperationException('hospitalId');
    return this.httpCliente.get<User[]>(`${API_URL}/hospital/${hospitalId}`);
  }

  updateById(user: User): Observable<void> {
    if (!user) throw new InvalidOperationException('user');
    return this.httpCliente.put<void>(`${API_URL}/${user.id}`, user);
  }

  deleteById(id: number): Observable<void> {
    if (!id) throw new InvalidOperationException('id');
    return this.httpCliente.delete<void>(`${API_URL}/${id}`);
  }
}
