import { describe } from '@module/utils/functions/enum';

export enum HeathPlan {
  Amil = 0,
  BradescoSaude = 1,
  Hapvida = 2,
  InterMedica = 3,
  NotredameIntermedica = 4,
  SulAmerica = 5,
  Unimed = 6,
  GoldenCross = 7,
  PortoSeguro = 8,
  SaoCristovao = 9,
  None = 10,
}

describe(HeathPlan, {
  Amil: 'Amil',
  BradescoSaude: 'Bradesco Saúde',
  Hapvida: 'Hapvida',
  InterMedica: 'Intermédica',
  NotredameIntermedica: 'NotreDame Intermédica',
  SulAmerica: 'Sul América',
  Unimed: 'Unimed',
  GoldenCross: 'Golden Cross',
  PortoSeguro: 'Porto Segur',
  SaoCristovao: 'São Cristóvão',
  None: 'Nenhum',
});
