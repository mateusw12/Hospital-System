import { describe } from '@module/utils/functions/enum';

export enum Role {
  Adm = 0,
  User = 1,
  Doctor = 2,
  Nurse = 3,
}

describe(Role, {
  Adm: 'Administrador',
  User: 'Usuário',
  Doctor: 'Medico',
  Nurse: 'Enfermeiro',
});
