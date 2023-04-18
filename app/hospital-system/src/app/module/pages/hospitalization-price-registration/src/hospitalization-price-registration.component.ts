import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DoctorAppointment, HospitalizationPrice } from '@module/models';
import {
  DoctorAppointmentRepository,
  HospitalRepository,
  HospitalizationPriceRepository,
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
  hospitalName: string;
  doctorAppointmentObservation: string;
  paymentDate: Date;
  totalValue: number;
  totalDays: number;
}

interface FormModel {
  id: FormControl<string | null>;
  hospitalId: FormControl<number | null>;
  doctorAppointmentId: FormControl<number | null>;
  totalDays: FormControl<number | null>;
  totalValue: FormControl<number | null>;
  isPayment: FormControl<boolean | null>;
  paymentDate: FormControl<Date | null>;
}

@Component({
  selector: 'app-doctor-appointment-registration',
  templateUrl: './hospitalization-price-registration.component.html',
  styleUrls: ['./hospitalizaiton-price-registration.component.scss'],
})
export class HospitalizationPriceRegistrationComponent
  implements OnInit, OnDestroy
{
  @ViewChild(ModalComponent, { static: true })
  modal!: ModalComponent;

  columns: SfGridColumnModel[] = this.createColumns();
  dataSource: GridRow[] = [];
  form = this.createForm();
  doctorAppointments: DoctorAppointment[] = [];

  readonly today = new Date();

  constructor(
    private toastService: ToastService,
    private messageService: MessageService,
    private errorHandler: ErrorHandler,
    private hospitalizationPriceRepository: HospitalizationPriceRepository,
    private hospitalRepository: HospitalRepository,
    private doctorAppointmentRepository: DoctorAppointmentRepository,
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
      ? this.hospitalizationPriceRepository.updateById(model)
      : this.hospitalizationPriceRepository.add(model)
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
        await this.findHospitalizationPrice(id);
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
    this.hospitalizationPriceRepository
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
    const hospitalId = await this.getHospital();
    forkJoin([
      this.hospitalizationPriceRepository.findAll(hospitalId),
      this.hospitalRepository.findAll(),
      this.doctorAppointmentRepository.findAll(),
    ])
      .pipe(untilDestroyed(this))
      .subscribe(
        async ([hospitalizationPrice, hospitals, doctorAppointments]) => {
          const dataSource: GridRow[] = [];
          this.doctorAppointments = doctorAppointments;

          for (const item of hospitalizationPrice) {
            const hospital = hospitals.find((el) => el.id === item.hospitalId);
            const doctorAppointment = doctorAppointments.find(
              (el) => el.id === item.doctorAppointmentId
            );

            dataSource.push({
              id: item.id,
              doctorAppointmentObservation: doctorAppointment
                ? doctorAppointment.observation
                : '',
              hospitalName: hospital ? hospital.name : '',
              totalDays: item.totalDays,
              paymentDate: item.paymentDate,
              totalValue: item.totalValue,
            });
          }
          this.dataSource = dataSource;
        },
        (error) => this.handleError(error)
      );
  }

  private async getHospital(): Promise<number> {
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

  private async findHospitalizationPrice(id: number): Promise<void> {
    this.hospitalizationPriceRepository
      .findById(id)
      .pipe(untilDestroyed(this))
      .subscribe((hospitalizationPrice) => {
        this.populateForm(hospitalizationPrice);
      });
  }

  private populateForm(hospitalizationPrice: HospitalizationPrice): void {
    this.form.patchValue({
      id: hospitalizationPrice.id.toString(),
      doctorAppointmentId: hospitalizationPrice.doctorAppointmentId,
      hospitalId: hospitalizationPrice.hospitalId,
      isPayment: hospitalizationPrice.isPayment,
      paymentDate: hospitalizationPrice.paymentDate,
      totalDays: hospitalizationPrice.totalDays,
      totalValue: hospitalizationPrice.totalValue,
    });
  }

  private getModel(): HospitalizationPrice {
    const model = new HospitalizationPrice();
    const formValue = this.form.getRawValue();
    model.id = formValue.id === NEW_ID ? 0 : Number(formValue.id);
    model.doctorAppointmentId = formValue.doctorAppointmentId as number;
    model.hospitalId = formValue.hospitalId as number;
    model.isPayment = formValue.isPayment as boolean;
    model.paymentDate = formValue.paymentDate as Date;
    model.totalDays = formValue.totalDays as number;
    model.totalValue = formValue.totalValue as number;
    return model;
  }

  private reset(): void {
    this.form.reset({
      id: NEW_ID,
    });
  }

  private handleError(error: unknown): void {
    this.errorHandler.present(error);
  }

  private createForm(): FormGroup<FormModel> {
    return new FormGroup<FormModel>({
      id: new FormControl<string | null>({ value: NEW_ID, disabled: true }),
      doctorAppointmentId: new FormControl<number | null>(null, [
        Validators.required,
        Validators.min(0),
      ]),
      hospitalId: new FormControl<number | null>(null),
      isPayment: new FormControl<boolean | null>(false),
      paymentDate: new FormControl<Date | null>(null, [Validators.required]),
      totalDays: new FormControl<number | null>(null, [
        Validators.min(0),
        Validators.required,
      ]),
      totalValue: new FormControl<number | null>(null, [
        Validators.min(0),
        Validators.required,
      ]),
    });
  }

  private createColumns() {
    return SfGridColumns.build<GridRow>({
      id: SfGridColumns.text('id', 'Código').minWidth(100).isPrimaryKey(true),
      hospitalName: SfGridColumns.text('hospitalName', 'Hospital').minWidth(
        100
      ),
      doctorAppointmentObservation: SfGridColumns.text(
        'doctorAppointmentObservation',
        'Observação Consulta Médica'
      ).minWidth(200),
      paymentDate: SfGridColumns.date('paymentDate', 'Data Pagamento').minWidth(
        100
      ),
      totalValue: SfGridColumns.numeric('totalValue', 'Valor Total').minWidth(
        100
      ),
      totalDays: SfGridColumns.numeric('totalDays', 'Total Dias').minWidth(100),
    });
  }
}
