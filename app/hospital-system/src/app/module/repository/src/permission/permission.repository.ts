import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Permission } from '@module/models';
import { InvalidOperationException } from '@module/utils/internal';
import { Observable } from 'rxjs';

const API_URL = 'api/menu/permissao';

@Injectable({ providedIn: 'root' })
export class PermissionRepository {
  constructor(private httpCliente: HttpClient) {}

  add(permission: Permission): Observable<void> {
    if (!permission) throw new InvalidOperationException('permission');
    return this.httpCliente.post<void>(API_URL, permission);
  }

  findById(id: number): Observable<Permission> {
    if (!id) throw new InvalidOperationException('id');
    return this.httpCliente.get<Permission>(`${API_URL}/${id}`);
  }

  findByUserName(userName: string): Observable<Permission[]> {
    if (!userName) throw new InvalidOperationException('userName');
    return this.httpCliente.get<Permission[]>(`${API_URL}/user/${userName}`);
  }

  findAll(): Observable<Permission[]> {
    return this.httpCliente.get<Permission[]>(`${API_URL}`);
  }

  updateById(permission: Permission): Observable<void> {
    if (!permission) throw new InvalidOperationException('permission');
    return this.httpCliente.put<void>(
      `${API_URL}/${permission.id}`,
      permission
    );
  }

  deleteById(id: number): Observable<void> {
    if (!id) throw new InvalidOperationException('id');
    return this.httpCliente.delete<void>(`${API_URL}/${id}`);
  }
}
