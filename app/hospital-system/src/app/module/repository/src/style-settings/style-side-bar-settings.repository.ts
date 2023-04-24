import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StyleSideBarSettings } from '@module/models';
import { InvalidOperationException } from '@module/utils/internal';
import { Observable } from 'rxjs';

const API_URL = 'api/configuracao/estilizacao/sidebar';

@Injectable({ providedIn: 'root' })
export class StyleSideBarSettingsRepository {
  constructor(private httpCliente: HttpClient) {}

  add(styleSideBarSettings: StyleSideBarSettings): Observable<void> {
    if (!styleSideBarSettings)
      throw new InvalidOperationException('styleSideBarSettings');
    return this.httpCliente.post<void>(API_URL, styleSideBarSettings);
  }

  findAll(hospitalId: number): Observable<StyleSideBarSettings> {
    if (!hospitalId) throw new InvalidOperationException('hospitalId');
    return this.httpCliente.get<StyleSideBarSettings>(
      `${API_URL}/${hospitalId}`
    );
  }

  deleteById(id: number): Observable<void> {
    if (!id) throw new InvalidOperationException('id');
    return this.httpCliente.delete<void>(`${API_URL}/${id}`);
  }
}
