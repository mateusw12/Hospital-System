import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Permission, Sector, SectorSettings } from '@module/models';
import { InvalidOperationException } from '@module/utils/internal';
import { Observable } from 'rxjs';

const API_URL = 'api/cadastro/configuracao-setor';

@Injectable({ providedIn: 'root' })
export class SectorSettingsRepository {
  constructor(private httpCliente: HttpClient) {}

  add(sectorSettings: SectorSettings): Observable<void> {
    if (!sectorSettings) throw new InvalidOperationException('sectorSettings');
    return this.httpCliente.post<void>(API_URL, sectorSettings);
  }

  findById(id: number): Observable<SectorSettings> {
    if (!id) throw new InvalidOperationException('id');
    return this.httpCliente.get<SectorSettings>(`${API_URL}/${id}`);
  }

  findBySector(sector: Sector): Observable<SectorSettings> {
    if (!sector) throw new InvalidOperationException('id');
    return this.httpCliente.get<SectorSettings>(`${API_URL}/sector/${sector}`);
  }

  findAll(): Observable<SectorSettings[]> {
    return this.httpCliente.get<SectorSettings[]>(`${API_URL}`);
  }

  updateById(sectorSettings: SectorSettings): Observable<void> {
    if (!sectorSettings) throw new InvalidOperationException('sectorSettings');
    return this.httpCliente.put<void>(
      `${API_URL}/${sectorSettings.id}`,
      sectorSettings
    );
  }

  deleteById(id: number): Observable<void> {
    if (!id) throw new InvalidOperationException('id');
    return this.httpCliente.delete<void>(`${API_URL}/${id}`);
  }
}
