export class HospitalizationPrice {
  id: number = 0;
  hospitalId: number = 0;
  doctorAppointmentId: number = 0;
  totalDays: number = 0;
  totalValue: number = 0;
  isPayment: boolean = false;
  paymentDate: Date = new Date();
}
