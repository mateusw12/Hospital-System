import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CovidStatistics } from '@module/models';
import { InvalidOperationException } from '@module/utils/internal';
import { Observable } from 'rxjs';

const API_URL = 'api/covid/estatistica';

@Injectable({ providedIn: 'root' })
export class CovidStatisticsRepository {
  constructor(private httpCliente: HttpClient) {}

  findStatistics(): Observable<CovidStatistics> {
    return this.httpCliente.get<CovidStatistics>(`${API_URL}/country`);
  }

  findStatisticsCountry(country: string): Observable<CovidStatistics> {
    if (!country) throw new InvalidOperationException('country');
    return this.httpCliente.get<CovidStatistics>(
      `${API_URL}/country/${country}`
    );
  }
}
