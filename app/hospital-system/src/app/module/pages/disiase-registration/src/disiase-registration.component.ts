import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Disiase } from '@module/models';
import { DisiaseRepository } from '@module/repository';
import { FormGridCommandEventArgs, ModalComponent } from '@module/shared';
import { SfGridColumnModel, SfGridColumns } from '@module/shared/src/grid';
import { untilDestroyed } from '@module/utils/common';
import { markAllAsTouched } from '@module/utils/forms';
import {
  ErrorHandler,
  MessageService,
  ToastService,
} from '@module/utils/services';

const NEW_ID = 'NOVO';

interface GridRow {
  id: number;
  name: string;
  cid: string;
}

interface FormModel {
  id: FormControl<string | null>;
  name: FormControl<string | null>;
  cid: FormControl<string | null>;
}

@Component({
  selector: 'app-disiase-registration',
  templateUrl: './disiase-registration.component.html',
  styleUrls: ['./disiase-registration.component.scss'],
})
export class DisiaseRegistrationComponent implements OnInit {
  @ViewChild(ModalComponent, { static: true })
  modal!: ModalComponent;

  columns: SfGridColumnModel[] = this.createColumns();
  dataSource: GridRow[] = [];
  form = this.createForm();

  constructor(
    private toastService: ToastService,
    private messageService: MessageService,
    private errorHandler: ErrorHandler,
    private disiaseRepository: DisiaseRepository
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
      ? this.disiaseRepository.updateById(model)
      : this.disiaseRepository.add(model)
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
        await this.findDisiase(id);
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
    this.disiaseRepository
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
    this.disiaseRepository
      .findAll()
      .pipe(untilDestroyed(this))
      .subscribe(
        async (disiases) => {
          const dataSource: GridRow[] = [];

          for (const item of disiases) {
            dataSource.push({
              id: item.id,
              name: item.name,
              cid: item.cid,
            });
          }
          this.dataSource = dataSource;
        },
        (error) => this.handleError(error)
      );
  }

  private async findDisiase(id: number): Promise<void> {
    this.disiaseRepository
      .findById(id)
      .pipe(untilDestroyed(this))
      .subscribe((user) => {
        this.populateForm(user);
      });
  }

  private populateForm(disiase: Disiase): void {
    this.form.patchValue({
      id: disiase.id.toString(),
      name: disiase.name,
      cid: disiase.cid,
    });
  }

  private getModel(): Disiase {
    const model = new Disiase();
    const formValue = this.form.getRawValue();
    model.id = formValue.id === NEW_ID ? 0 : Number(formValue.id);
    model.name = formValue.name as string;
    model.cid = formValue.cid as string;
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
      name: new FormControl<string | null>(null, [
        Validators.required,
        Validators.maxLength(200),
      ]),
      cid: new FormControl<string | null>(null, [
        Validators.maxLength(100),
        Validators.required,
      ]),
    });
  }

  private createColumns() {
    return SfGridColumns.build<GridRow>({
      id: SfGridColumns.text('id', 'Código').minWidth(100).isPrimaryKey(true),
      name: SfGridColumns.text('name', 'Nome').minWidth(200),
      cid: SfGridColumns.text('cid', 'CID').minWidth(100),
    });
  }
}
