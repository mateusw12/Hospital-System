import { User } from '../user/user';

export class MedicalProcedure {
  id: number = 0;
  name: string = '';
  description: string = '';
  price: number = 0;
  doctors: User[] = [];
}
