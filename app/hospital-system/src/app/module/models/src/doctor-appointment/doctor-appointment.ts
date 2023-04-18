export class DoctorAppointment {
  id: number = 0;
  userName: string = '';
  patientId: number = 0;
  hospitalId: number = 0;
  appointmentDate: Date = new Date();
  observation: string = '';
  prescription: string = '';
  medicalCertificate: boolean = false;
}
