import { Gender } from '../gender/gender';
import { HeathPlan } from '../heath-plan/heath-plan';
import { MaritalStatus } from '../marital-status/marital-status';

export class Patient {
  id: number = 0;
  name: string = '';
  cpf: string = '';
  heathPlan: HeathPlan = HeathPlan.Amil;
  email: string = '';
  phone: string = '';
  zipCode: string = '';
  street: string = '';
  district: string = '';
  city: string = '';
  state: string = '';
  houseNumber: number = 0;
  age: number = 0;
  gender: Gender = Gender.Male;
  maritalStatus: MaritalStatus = MaritalStatus.Single;
  hasHeathPlan: boolean = false;
  hospitalId: number = 0;
}
