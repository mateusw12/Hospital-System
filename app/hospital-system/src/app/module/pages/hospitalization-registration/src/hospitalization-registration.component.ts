import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DoctorAppointment, Hospitalization, Sector } from '@module/models';
import {
  DoctorAppointmentRepository,
  HospitalizatioRepository,
} from '@module/repository';
import { FormGridCommandEventArgs, ModalComponent } from '@module/shared';
import { SfGridColumnModel, SfGridColumns } from '@module/shared/src/grid';
import { untilDestroyed, untilDestroyedAsync } from '@module/utils/common';
import { markAllAsTouched } from '@module/utils/forms';
import {
  EnumItem,
  getDescription,
  toArray,
} from '@module/utils/functions/enum';
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
  doctorAppointmentObservation: string;
  initialSector: string;
  hospitalizationDate: Date;
  totalDay: number;
  isFinished: boolean;
}

interface FormModel {
  id: FormControl<string | null>;
  initialSector: FormControl<Sector | null>;
  doctorAppointmentId: FormControl<number | null>;
  hospitalizationDate: FormControl<Date | null>;
  totalDay: FormControl<number | null>;
  isFinished: FormControl<boolean | null>;
}

@Component({
  selector: 'app-doctor-appointment-registration',
  templateUrl: './hospitalization-registration.component.html',
  styleUrls: ['./hospitalization-registration.component.scss'],
})
export class HospitalizationRegistrationComponent implements OnInit, OnDestroy {
  @ViewChild(ModalComponent, { static: true })
  modal!: ModalComponent;

  columns: SfGridColumnModel[] = this.createColumns();
  dataSource: GridRow[] = [];
  form = this.createForm();
  doctorAppointments: DoctorAppointment[] = [];
  sectors: EnumItem[] = toArray(Sector);

  readonly today = new Date();

  constructor(
    private toastService: ToastService,
    private messageService: MessageService,
    private errorHandler: ErrorHandler,
    private hospitalizationRepository: HospitalizatioRepository,
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
      ? this.hospitalizationRepository.updateById(model)
      : this.hospitalizationRepository.add(model)
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
        await this.findHospitalization(id);
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
    this.hospitalizationRepository
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
      this.hospitalizationRepository.findAll(),
      this.doctorAppointmentRepository.findAll(hospitalId),
    ])
      .pipe(untilDestroyed(this))
      .subscribe(
        async ([hospitalizationPrice, doctorAppointments]) => {
          const dataSource: GridRow[] = [];
          this.doctorAppointments = doctorAppointments;

          for (const item of hospitalizationPrice) {
            const doctorAppointment = doctorAppointments.find(
              (el) => el.id === item.doctorAppointmentId
            );

            dataSource.push({
              id: item.id,
              doctorAppointmentObservation: doctorAppointment
                ? doctorAppointment.observation
                : '',
              hospitalizationDate: item.hospitalizationDate,
              totalDay: item.totalDay,
              initialSector: getDescription(
                Sector,
                item.initialSector as unknown as string
              ),
              isFinished: item.isFinished,
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

  private async findHospitalization(id: number): Promise<void> {
    this.hospitalizationRepository
      .findById(id)
      .pipe(untilDestroyed(this))
      .subscribe((hospitalization) => {
        this.populateForm(hospitalization);
      });
  }

  private populateForm(hospitalization: Hospitalization): void {
    this.form.patchValue({
      id: hospitalization.id.toString(),
      doctorAppointmentId: hospitalization.doctorAppointmentId,
      hospitalizationDate: hospitalization.hospitalizationDate,
      initialSector: hospitalization.initialSector,
      isFinished: hospitalization.isFinished,
      totalDay: hospitalization.totalDay,
    });
  }

  private getModel(): Hospitalization {
    const model = new Hospitalization();
    const formValue = this.form.getRawValue();
    model.id = formValue.id === NEW_ID ? 0 : Number(formValue.id);
    model.doctorAppointmentId = formValue.doctorAppointmentId as number;
    model.hospitalizationDate = formValue.hospitalizationDate as Date;
    model.isFinished = formValue.isFinished as boolean;
    model.initialSector = formValue.initialSector as Sector;
    model.totalDay = formValue.totalDay as number;
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
      hospitalizationDate: new FormControl<Date | null>(
        null,
        Validators.required
      ),
      initialSector: new FormControl<Sector | null>(null, Validators.required),
      isFinished: new FormControl<boolean | null>(false),
      totalDay: new FormControl<number | null>(null, [
        Validators.min(0),
        Validators.required,
      ]),
    });
  }

  private createColumns() {
    return SfGridColumns.build<GridRow>({
      id: SfGridColumns.text('id', 'Código').minWidth(100).isPrimaryKey(true),
      doctorAppointmentObservation: SfGridColumns.text(
        'doctorAppointmentObservation',
        'Observação Consulta Médica'
      ).minWidth(200),
      initialSector: SfGridColumns.date(
        'initialSector',
        'Setor de Internação'
      ).minWidth(100),
      hospitalizationDate: SfGridColumns.date(
        'hospitalizationDate',
        'Data Internação'
      ).minWidth(100),
      totalDay: SfGridColumns.numeric('totalDay', 'Total Dias').minWidth(100),
      isFinished: SfGridColumns.boolean('isFinished', 'Liberado').minWidth(100),
    });
  }
}
