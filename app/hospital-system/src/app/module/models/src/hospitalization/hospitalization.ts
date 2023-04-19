import { Sector } from '../sector/sector';

export class Hospitalization {
  id: number = 0;
  doctorAppointmentId: number = 0;
  initialSector: Sector = Sector.Adm;
  hospitalizationDate: Date = new Date();
  totalDay: number = 0;
  isFinished: boolean = false;
}
