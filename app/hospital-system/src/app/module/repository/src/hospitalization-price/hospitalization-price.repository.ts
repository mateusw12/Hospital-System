import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HospitalizationPrice } from '@module/models';
import { InvalidOperationException } from '@module/utils/internal';
import { Observable } from 'rxjs';

const API_URL = 'api/cadastro/internacao-custo';

@Injectable({ providedIn: 'root' })
export class HospitalizationPriceRepository {
  constructor(private httpCliente: HttpClient) {}

  add(hospitalizationPrice: HospitalizationPrice): Observable<void> {
    if (!hospitalizationPrice)
      throw new InvalidOperationException('hospitalizationPrice');
    return this.httpCliente.post<void>(API_URL, hospitalizationPrice);
  }

  findById(id: number): Observable<HospitalizationPrice> {
    if (!id) throw new InvalidOperationException('id');
    return this.httpCliente.get<HospitalizationPrice>(`${API_URL}/${id}`);
  }

  findAll(hospitalId: number): Observable<HospitalizationPrice[]> {
    return this.httpCliente.get<HospitalizationPrice[]>(
      `${API_URL}/hospital/${hospitalId}`
    );
  }

  updateById(hospitalizationPrice: HospitalizationPrice): Observable<void> {
    if (!hospitalizationPrice)
      throw new InvalidOperationException('hospitalizationPrice');
    return this.httpCliente.put<void>(
      `${API_URL}/${hospitalizationPrice.id}`,
      hospitalizationPrice
    );
  }

  deleteById(id: number): Observable<void> {
    if (!id) throw new InvalidOperationException('id');
    return this.httpCliente.delete<void>(`${API_URL}/${id}`);
  }
}
