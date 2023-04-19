import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  Hospitalization,
  HospitalizationHistoric,
  Sector,
} from '@module/models';
import {
  DoctorAppointmentRepository,
  HospitalizationHistoricRepository,
  HospitalizationPriceRepository,
  HospitalizationRepository,
} from '@module/repository';
import { FormGridCommandEventArgs, ModalComponent } from '@module/shared';
import { SfGridColumnModel, SfGridColumns } from '@module/shared/src/grid';
import { untilDestroyed, untilDestroyedAsync } from '@module/utils/common';
import { markAllAsTouched } from '@module/utils/forms';
import { addDays } from '@module/utils/functions/date';
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
  description: string;
  hospitalName: string;
  doctorAppointmentObservation: string;
  hospitalizationHistoricDate: Date;
  totalValue: number;
  initialSector: string;
  currentSector: string;
  isFinished: boolean;
  totalDays: number;
}

interface FormModel {
  id: FormControl<string | null>;
  description: FormControl<string | null>;
  hospitalizationId: FormControl<number | null>;
  currentSector: FormControl<Sector | null>;
  days: FormControl<number | null>;
}

@Component({
  selector: 'app-hospitalization-historic-registration',
  templateUrl: './hospitalization-historic-registration.component.html',
  styleUrls: ['./hospitalization-historic-registration.component.scss'],
})
export class HospitalizationHistoricRegistrationComponent
  implements OnInit, OnDestroy
{
  @ViewChild(ModalComponent, { static: true })
  modal!: ModalComponent;

  columns: SfGridColumnModel[] = this.createColumns();
  dataSource: GridRow[] = [];
  form = this.createForm();
  hospitalizations: Hospitalization[] = [];
  sectors: EnumItem[] = toArray(Sector);

  readonly today = new Date();

  constructor(
    private toastService: ToastService,
    private messageService: MessageService,
    private errorHandler: ErrorHandler,
    private hospitalizationPriceRepository: HospitalizationPriceRepository,
    private doctorAppointmentRepository: DoctorAppointmentRepository,
    private menuService: MenuService,
    private hospitalizationRepository: HospitalizationRepository,
    private hospitalizationHistoricRepository: HospitalizationHistoricRepository
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
      ? this.hospitalizationHistoricRepository.updateById(model)
      : this.hospitalizationHistoricRepository.add(model)
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
    this.hospitalizationHistoricRepository
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
      this.hospitalizationHistoricRepository.findAll(),
      this.hospitalizationPriceRepository.findAll(hospitalId),
      this.hospitalizationRepository.findAll(),
      this.doctorAppointmentRepository.findAll(hospitalId),
    ])
      .pipe(untilDestroyed(this))
      .subscribe(
        async ([
          hospitalizationHistoric,
          hospitalizationPrices,
          hospitalizations,
          doctorAppointments,
        ]) => {
          this.hospitalizations = hospitalizations;
          const dataSource: GridRow[] = [];
          for (const item of hospitalizationHistoric) {
            const hospitalization = hospitalizations.find(
              (el) => el.id === item.hospitalizationId
            );
            const doctorAppointment = doctorAppointments.find(
              (el) =>
                el.id ===
                (hospitalization ? hospitalization.doctorAppointmentId : 0)
            );

            const hospitalizationPrice = hospitalizationPrices.find(
              (el) =>
                el.doctorAppointmentId ===
                (doctorAppointment ? doctorAppointment.id : 0)
            );

            dataSource.push({
              id: item.id,
              doctorAppointmentObservation: doctorAppointment
                ? doctorAppointment.observation
                : '',
              hospitalName: '',
              totalDays: item.days,
              currentSector: getDescription(
                Sector,
                item.currentSector as unknown as string
              ),
              initialSector: getDescription(
                Sector,
                hospitalization
                  ? (hospitalization.initialSector as unknown as string)
                  : ''
              ),
              isFinished: hospitalization ? hospitalization.isFinished : false,
              hospitalizationHistoricDate: this.getHospitalizationHistoricDate(
                item.days,
                hospitalization
              ),
              totalValue: hospitalizationPrice
                ? hospitalizationPrice.totalValue
                : 0,
              description: item.description,
            });
          }
          this.dataSource = dataSource;
        },
        (error) => this.handleError(error)
      );
  }

  private getHospitalizationHistoricDate(
    days: number,
    hospitalization: Hospitalization | undefined
  ): Date {
    if (!hospitalization) return this.today;
    return addDays(this.today, days);
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
    this.hospitalizationHistoricRepository
      .findById(id)
      .pipe(untilDestroyed(this))
      .subscribe((hospitalizationHistoric) => {
        this.populateForm(hospitalizationHistoric);
      });
  }

  private populateForm(hospitalizationHistoric: HospitalizationHistoric): void {
    this.form.patchValue({
      id: hospitalizationHistoric.id.toString(),
      hospitalizationId: hospitalizationHistoric.hospitalizationId,
      currentSector: hospitalizationHistoric.currentSector,
      days: hospitalizationHistoric.days,
      description: hospitalizationHistoric.description,
    });
  }

  private getModel(): HospitalizationHistoric {
    const model = new HospitalizationHistoric();
    const formValue = this.form.getRawValue();
    model.id = formValue.id === NEW_ID ? 0 : Number(formValue.id);
    model.hospitalizationId = formValue.hospitalizationId as number;
    model.days = formValue.days as number;
    model.currentSector = formValue.currentSector as Sector;
    model.description = formValue.description as string;
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
      currentSector: new FormControl<Sector | null>(null, [
        Validators.required,
      ]),
      days: new FormControl<number | null>(null, [
        Validators.required,
        Validators.min(0),
      ]),
      hospitalizationId: new FormControl<number | null>(null, [
        Validators.required,
        Validators.min(0),
      ]),
      description: new FormControl<string | null>(null, [
        Validators.required,
        Validators.maxLength(200),
      ]),
    });
  }

  private createColumns() {
    return SfGridColumns.build<GridRow>({
      id: SfGridColumns.text('id', 'Código').minWidth(100).isPrimaryKey(true),
      description: SfGridColumns.text(
        'description',
        'Descrição Internação'
      ).minWidth(100),
      hospitalName: SfGridColumns.text('hospitalName', 'Hospital').minWidth(
        100
      ),
      doctorAppointmentObservation: SfGridColumns.text(
        'doctorAppointmentObservation',
        'Observação Consulta Médica'
      ).minWidth(200),
      initialSector: SfGridColumns.text(
        'initialSector',
        'Setor Inicial'
      ).minWidth(100),
      currentSector: SfGridColumns.text(
        'currentSector',
        'Setor Atual'
      ).minWidth(100),
      hospitalizationHistoricDate: SfGridColumns.date(
        'hospitalizationHistoricDate',
        'Data Internação Setor Atual'
      ).minWidth(100),
      totalDays: SfGridColumns.numeric('totalDays', 'Total Dias').minWidth(100),
      totalValue: SfGridColumns.numeric('totalValue', 'Valor Total').minWidth(
        100
      ),
      isFinished: SfGridColumns.boolean(
        'isFinished',
        'Internação Finalizada'
      ).minWidth(100),
    });
  }
}
