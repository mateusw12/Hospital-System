import { Sector } from '../sector/sector';

export class HospitalizationHistoric {
  id: number = 0;
  description: string = '';
  hospitalizationId: number = 0;
  currentSector: Sector = Sector.Adm;
  days: number = 0;
}
