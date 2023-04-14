import { Sector } from '../sector/sector';

export class SectorSettings {
  id: number = 0;
  hospitalId: number = 0;
  dailyPrice: number = 0;
  hasHealthInsurance: boolean = false;
  bedNumber: number = 0;
  sector: Sector = Sector.Adm;
}
