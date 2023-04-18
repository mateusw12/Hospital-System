import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DoctorAppointment, Patient, User } from '@module/models';
import {
  DoctorAppointmentRepository,
  HospitalRepository,
  PatientRepository,
  UserRepository,
} from '@module/repository';
import { FormGridCommandEventArgs, ModalComponent } from '@module/shared';
import { SfGridColumnModel, SfGridColumns } from '@module/shared/src/grid';
import { untilDestroyed, untilDestroyedAsync } from '@module/utils/common';
import { markAllAsTouched } from '@module/utils/forms';
import {
  ErrorHandler,
  MenuService,
  MessageService,
  ToastService,
} from '@module/utils/services';
import { forkJoin } from 'rxjs';

const NEW_ID = 'NOVO';

interface GridRow {
  id: number;
  observation: string;
  userName: string;
  patientName: string;
  hospitalName: string;
  appointmentDate: Date;
}

interface FormModel {
  id: FormControl<string | null>;
  patiendId: FormControl<number | null>;
  hospitalId: FormControl<number | null>;
  userName: FormControl<string | null>;
  observation: FormControl<string | null>;
  prescription: FormControl<string | null>;
  medicalCertificate: FormControl<boolean | null>;
  appointmentDate: FormControl<Date | null>;
}

@Component({
  selector: 'app-doctor-appointment-registration',
  templateUrl: './doctor-appointment-registration.component.html',
  styleUrls: ['./doctor-appointment-registration.component.scss'],
})
export class DoctorAppointmentRegistrationComponent implements OnInit {
  @ViewChild(ModalComponent, { static: true })
  modal!: ModalComponent;

  columns: SfGridColumnModel[] = this.createColumns();
  dataSource: GridRow[] = [];
  form = this.createForm();
  userName: string = '';
  patients: Patient[] = [];
  users: User[] = [];

  readonly today = new Date();

  constructor(
    private toastService: ToastService,
    private messageService: MessageService,
    private errorHandler: ErrorHandler,
    private doctorAppointmentRepository: DoctorAppointmentRepository,
    private patientRepository: PatientRepository,
    private userRepository: UserRepository,
    private hospitalRepository: HospitalRepository,
    private menuService: MenuService
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  onCommand(event: FormGridCommandEventArgs): void {
    switch (event.command) {
      case 'Add':
        this.onCommandAdd();
        break;
      case 'Edit':
        this.onCommandEdit(event.rowData as GridRow);
        break;
      case 'Remove':
        this.onCommandRemove(event.rowData as GridRow);
        break;
      default:
        break;
    }
  }

  async onModalClose(): Promise<void> {
    this.modal.onCloseClick();
  }

  async onSaveClick(): Promise<void> {
    if (!this.form.valid) {
      markAllAsTouched(this.form);
      return;
    }
    const model = this.getModel();
    const exists = model.id > 0;

    if (exists) {
      const confirmed = await this.messageService.showConfirmSave();
      if (!confirmed) return;
    }

    (exists
      ? this.doctorAppointmentRepository.updateById(model)
      : this.doctorAppointmentRepository.add(model)
    )
      .pipe(untilDestroyed(this))
      .subscribe(
        async () => {
          this.toastService.showSuccess();
          this.reset();
          if (exists) this.modal.onCloseClick();
          this.loadData();
        },
        async (error) => this.handleError(error)
      );
  }

  ngOnDestroy(): void {}

  private async onOpen(id?: number): Promise<void> {
    this.reset();
    try {
      if (id) {
        await this.findDoctorAppointment(id);
      }
      this.modal.open();
    } catch (error) {
      this.handleError(error);
    }
  }

  private onCommandAdd(): void {
    this.onOpen();
  }

  private onCommandEdit(model: GridRow): void {
    this.onOpen(model.id);
  }

  private async onCommandRemove(model: GridRow): Promise<void> {
    const confirmed = await this.messageService.showConfirmDelete();
    if (!confirmed) return;
    this.doctorAppointmentRepository
      .deleteById(model.id)
      .pipe(untilDestroyed(this))
      .subscribe(
        () => {
          this.toastService.showRemove();
          this.loadData();
        },
        (error) => this.handleError(error)
      );
  }

  private async loadData(): Promise<void> {
    const hospitalId = await this.getHospitalId();
    this.form.controls.hospitalId.setValue(hospitalId);
    forkJoin([
      this.doctorAppointmentRepository.findAll(hospitalId),
      this.hospitalRepository.findAll(),
      this.patientRepository.findAll(hospitalId),
      this.userRepository.findAll(),
      this.userRepository.findMe(),
    ])
      .pipe(untilDestroyed(this))
      .subscribe(
        async ([doctorAppointments, hospitals, patients, users, user]) => {
          const dataSource: GridRow[] = [];
          this.userName = user.userName;
          this.patients = patients;
          this.users = users;
          this.form.controls.userName.setValue(this.userName);

          for (const item of doctorAppointments) {
            const hospital = hospitals.find((el) => el.id === item.hospitalId);
            const patient = patients.find((el) => el.id === item.patientId);

            dataSource.push({
              id: item.id,
              userName: item.userName,
              appointmentDate: item.appointmentDate,
              hospitalName: hospital ? hospital.name : '',
              patientName: patient ? patient.name : '',
              observation: item.observation,
            });
          }
          this.dataSource = dataSource;
        },
        (error) => this.handleError(error)
      );
  }

  private async getHospitalId(): Promise<number> {
    try {
      const hospital = await untilDestroyedAsync(
        this.menuService.getActiveHospital(),
        this
      );
      return hospital.id;
    } catch (error) {
      this.handleError(error);
      return 0;
    }
  }

  private async findDoctorAppointment(id: number): Promise<void> {
    this.doctorAppointmentRepository
      .findById(id)
      .pipe(untilDestroyed(this))
      .subscribe((doctorAppointment) => {
        this.populateForm(doctorAppointment);
      });
  }

  private populateForm(doctorAppointment: DoctorAppointment): void {
    this.form.patchValue({
      id: doctorAppointment.id.toString(),
      userName: doctorAppointment.userName,
      observation: doctorAppointment.observation,
      hospitalId: doctorAppointment.hospitalId,
      medicalCertificate: doctorAppointment.medicalCertificate,
      prescription: doctorAppointment.prescription,
      patiendId: doctorAppointment.patientId,
      appointmentDate: doctorAppointment.appointmentDate,
    });
  }

  private getModel(): DoctorAppointment {
    const model = new DoctorAppointment();
    const formValue = this.form.getRawValue();
    model.id = formValue.id === NEW_ID ? 0 : Number(formValue.id);
    model.userName = formValue.userName as string;
    model.observation = formValue.observation as string;
    model.prescription = formValue.prescription as string;
    model.hospitalId = formValue.hospitalId as number;
    model.patientId = formValue.patiendId as number;
    model.appointmentDate = formValue.appointmentDate as Date;
    model.medicalCertificate = formValue.medicalCertificate as boolean;
    return model;
  }

  private reset(): void {
    this.form.reset({
      id: NEW_ID,
      userName: this.userName,
      appointmentDate: this.today
    });
  }

  private handleError(error: unknown): void {
    this.errorHandler.present(error);
  }

  private createForm(): FormGroup<FormModel> {
    return new FormGroup<FormModel>({
      id: new FormControl<string | null>({ value: NEW_ID, disabled: true }),
      userName: new FormControl<string | null>({
        value: '',
        disabled: true,
      }),
      observation: new FormControl<string | null>(null, [
        Validators.maxLength(1000),
        Validators.required,
      ]),
      prescription: new FormControl<string | null>(null, [
        Validators.maxLength(1000),
        Validators.required,
      ]),
      medicalCertificate: new FormControl<boolean | null>(false),
      hospitalId: new FormControl<number | null>(null),
      patiendId: new FormControl<number | null>(null, [
        Validators.required,
        Validators.min(0),
      ]),
      appointmentDate: new FormControl<Date | null>(null, [
        Validators.required,
      ]),
    });
  }

  private createColumns() {
    return SfGridColumns.build<GridRow>({
      id: SfGridColumns.text('id', 'Código').minWidth(100).isPrimaryKey(true),
      observation: SfGridColumns.text('observation', 'Observação').minWidth(200),
      userName: SfGridColumns.text('userName', 'Médico').minWidth(200),
      patientName: SfGridColumns.text('patientName', 'Paciente').minWidth(100),
      appointmentDate: SfGridColumns.date(
        'appointmentDate',
        'Data Consulta'
      ).minWidth(100),
      hospitalName: SfGridColumns.text('hospitalName', 'Hospital').minWidth(
        200
      ),
    });
  }
}
