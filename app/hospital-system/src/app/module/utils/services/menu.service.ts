import { Injectable, OnDestroy } from '@angular/core';
import { Hospital } from '@module/models';
import { HospitalRepository } from '@module/repository';
import { untilDestroyed } from '@module/utils/common';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class MenuService implements OnDestroy {
  private hospitalChangeSubject = new BehaviorSubject<Hospital | undefined>(
    undefined
  );

  constructor(private hospitalRepository: HospitalRepository) {}

  getActiveHospital(): Observable<Hospital> {
    return this.hospitalRepository.findAll().pipe(
      map((hospitals: Hospital[]) =>
        hospitals.filter((hospital) => hospital.isActive)
      ),
      map((activeHospitals: Hospital[]) => activeHospitals[0]),
      untilDestroyed(this)
    );
  }

  onHospitalChange(): Observable<Hospital | undefined> {
    return this.hospitalChangeSubject.asObservable();
  }

  onHospitalChange$(id: number): void {
    this.hospitalRepository.findById(id).subscribe(
      (hospital) => this.hospitalChangeSubject.next(hospital),
      (error) => console.error('onHospitalChange$', error)
    );
  }

  ngOnDestroy(): void {}
}
