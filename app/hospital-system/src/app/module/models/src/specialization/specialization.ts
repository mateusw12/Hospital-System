import { describe } from '@module/utils/functions/enum';

export enum Specialization {
  GeneralPratictitioner = 0,
  Ginecology = 1,
  Cardiologist = 2,
  Surgeon = 3,
  Dermatologist = 4,
  Endocrinologist = 5,
  Geriatric = 6,
  Pediatrician = 7,
  Othorpedist = 8,
}  

describe(Specialization, {
  GeneralPratictitioner: 'Clinico Geral',
  Ginecology: 'Ginecologista',
  Cardiologist: 'Cardiologista',
  Surgeon: 'Cirurgião',
  Dermatologist: 'Dermatologista',
  Endocrinologist: 'Endocrinologista',
  Geriatric: 'Geriatra',
  Pediatrician: 'Pediatra',
  Othorpedist: 'Ortopedista',
});
