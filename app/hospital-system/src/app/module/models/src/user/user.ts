import { MedicalProcedure } from '../medical-procedure/medical-procedure';
import { Role } from '../role/role';
import { Specialization } from '../specialization/specialization';

export class User {
  id: number = 0;
  name: string = '';
  userName: string = '';
  password: string = '';
  crm: string = '';
  isActive: boolean = false;
  role: Role = Role.User;
  email: string = '';
  hospitalId: number = 0;
  specialization: Specialization = Specialization.Cardiologist;
  procedures: MedicalProcedure[] = [];
}
