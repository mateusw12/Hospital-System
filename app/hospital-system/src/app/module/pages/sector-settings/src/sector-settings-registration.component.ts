import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Hospital, Sector, SectorSettings } from '@module/models';
import {
  HospitalRepository,
  SectorSettingsRepository,
} from '@module/repository';
import { FormGridCommandEventArgs, ModalComponent } from '@module/shared';
import { SfGridColumnModel, SfGridColumns } from '@module/shared/src/grid';
import { untilDestroyed } from '@module/utils/common';
import { markAllAsTouched } from '@module/utils/forms';
import {
  EnumItem,
  getDescription,
  toArray,
} from '@module/utils/functions/enum';
import {
  ErrorHandler,
  MessageService,
  ToastService,
} from '@module/utils/services';
import { forkJoin } from 'rxjs';

const NEW_ID = 'NOVO';

interface GridRow {
  id: number;
  hospitalName: string;
  sector: string;
  dailyPrice: number;
  bedNumber: number;
  hasHealthInsurance: boolean;
}

interface FormModel {
  id: FormControl<string | null>;
  sector: FormControl<Sector | null>;
  hospitalId: FormControl<number | null>;
  hasHealthInsurance: FormControl<boolean | null>;
  bedNumber: FormControl<number | null>;
  dailyPrice: FormControl<number | null>;
}

@Component({
  selector: 'app-sector-settings-registration',
  templateUrl: './sector-settings-registration.component.html',
  styleUrls: ['./sector-settings-registration.component.scss'],
})
export class SectorSettingsRegistrationComponent implements OnInit {
  @ViewChild(ModalComponent, { static: true })
  modal!: ModalComponent;

  columns: SfGridColumnModel[] = this.createColumns();
  dataSource: GridRow[] = [];
  form = this.createForm();

  sectors: EnumItem[] = toArray(Sector);
  hospitals: Hospital[] = [];

  constructor(
    private toastService: ToastService,
    private messageService: MessageService,
    private errorHandler: ErrorHandler,
    private sectorSettingsRepository: SectorSettingsRepository,
    private hospitalRepository: HospitalRepository
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
      ? this.sectorSettingsRepository.updateById(model)
      : this.sectorSettingsRepository.add(model)
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
        await this.findSectorSettings(id);
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
    this.sectorSettingsRepository
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

  private loadData(): void {
    forkJoin([
      this.sectorSettingsRepository.findAll(),
      this.hospitalRepository.findAll(),
    ])
      .pipe(untilDestroyed(this))
      .subscribe(
        async ([sectorSettings, hospitals]) => {
          const dataSource: GridRow[] = [];
          this.hospitals = hospitals;
          for (const item of sectorSettings) {
            const hospital = hospitals.find((el) => el.id === item.hospitalId);

            dataSource.push({
              id: item.id,
              bedNumber: item.bedNumber,
              dailyPrice: item.dailyPrice,
              hasHealthInsurance: item.hasHealthInsurance,
              sector: getDescription(Sector, item.sector as unknown as string),
              hospitalName: hospital ? hospital.name : '',
            });
          }
          this.dataSource = dataSource;
        },
        (error) => this.handleError(error)
      );
  }

  private async findSectorSettings(id: number): Promise<void> {
    this.sectorSettingsRepository
      .findById(id)
      .pipe(untilDestroyed(this))
      .subscribe((user) => {
        this.populateForm(user);
      });
  }

  private populateForm(sectorSettings: SectorSettings): void {
    this.form.patchValue({
      id: sectorSettings.id.toString(),
      bedNumber: sectorSettings.bedNumber,
      dailyPrice: sectorSettings.dailyPrice,
      hasHealthInsurance: sectorSettings.hasHealthInsurance,
      hospitalId: sectorSettings.hospitalId,
      sector: sectorSettings.sector,
    });
  }

  private getModel(): SectorSettings {
    const model = new SectorSettings();
    const formValue = this.form.getRawValue();
    model.id = formValue.id === NEW_ID ? 0 : Number(formValue.id);
    model.bedNumber = formValue.bedNumber as number;
    model.dailyPrice = formValue.dailyPrice as number;
    model.hasHealthInsurance = formValue.hasHealthInsurance as boolean;
    model.hospitalId = formValue.hospitalId as number;
    model.sector = formValue.sector as Sector;
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
      bedNumber: new FormControl<number | null>(null, [
        Validators.required,
        Validators.min(0),
      ]),
      dailyPrice: new FormControl<number | null>(null, [
        Validators.required,
        Validators.min(0),
      ]),
      hospitalId: new FormControl<number | null>(null, [
        Validators.required,
        Validators.min(0),
      ]),
      sector: new FormControl<Sector | null>(null, [Validators.required]),
      hasHealthInsurance: new FormControl<boolean | null>(false),
    });
  }

  private createColumns() {
    return SfGridColumns.build<GridRow>({
      id: SfGridColumns.text('id', 'Código')
        .minWidth(100)
        .isPrimaryKey(true),
      hospitalName: SfGridColumns.text('hospitalName', 'Hospital').minWidth(
        100
      ),
      dailyPrice: SfGridColumns.numeric('dailyPrice', 'Valor Diária').minWidth(
        100
      ),
      bedNumber: SfGridColumns.numeric('bedNumber', 'Número Leitos').minWidth(
        200
      ),
      sector: SfGridColumns.text('sector', 'Setor').minWidth(100),
      hasHealthInsurance: SfGridColumns.boolean(
        'hasHealthInsurance',
        'Possui Plano de Saúde'
      ).minWidth(80),
    });
  }
}
