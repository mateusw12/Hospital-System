import { describe } from '@module/utils/functions/enum';

export enum MaritalStatus {
  Married = 0,
  StableUnion = 1,
  Widower = 2,
  Single = 3,
}

describe(MaritalStatus, {
  Married: 'Casado',
  StableUnion: 'União Estável',
  Widower: 'Viúvo',
  Single: 'Solteiro',
});
