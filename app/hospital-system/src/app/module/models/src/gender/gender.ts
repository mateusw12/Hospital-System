import { describe } from '@module/utils/functions/enum';

export enum Gender {
  Male = 0,
  Female = 1,
}

describe(Gender, {
  Male: 'Masculino',
  Female: 'Feminino',
});
