import { describe } from '@module/utils/functions/enum';

export enum Sector {
  Room = 0,
  Infirmary = 1,
  BirthRoom = 2,
  Nursery = 3,
  ApartmentPostpartum = 4,
  Emergency = 5,
  Icu = 6,
  Surgey = 7,
  Adm = 8,
}

describe(Sector, {
  Room: 'Quarto',
  Infirmary: 'Enfermaria',
  BirthRoom: 'Sala de parto',
  Nursery: 'Berçário',
  ApartmentPostpartum: 'Apartamento para o pós-parto',
  Emergency: 'Pronto-socorro',
  Icu: 'UTI',
  Surgey: 'Cirurgia',
  Adm: 'Administração',
});
