import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Item } from '@module/models';
import { InvalidOperationException } from '@module/utils/internal';
import { Observable } from 'rxjs';

const API_URL = 'api/menu/item';

@Injectable({ providedIn: 'root' })
export class ItemRepository {
  constructor(private httpCliente: HttpClient) {}

  add(item: Item): Observable<void> {
    if (!item) throw new InvalidOperationException('item');
    return this.httpCliente.post<void>(API_URL, item);
  }

  findById(id: number): Observable<Item> {
    if (!id) throw new InvalidOperationException('id');
    return this.httpCliente.get<Item>(`${API_URL}/${id}`);
  }

  findAll(): Observable<Item[]> {
    return this.httpCliente.get<Item[]>(`${API_URL}`);
  }

  updateById(item: Item): Observable<void> {
    if (!item) throw new InvalidOperationException('item');
    return this.httpCliente.put<void>(`${API_URL}/${item.id}`, item);
  }

  deleteById(id: number): Observable<void> {
    if (!id) throw new InvalidOperationException('id');
    return this.httpCliente.delete<void>(`${API_URL}/${id}`);
  }
}
