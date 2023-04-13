import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Item } from '@module/models';
import { ItemRepository } from '@module/repository';
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
  description: string;
  descriptionFather: string;
  visible: boolean;
}

interface FormModel {
  id: FormControl<string | null>;
  description: FormControl<string | null>;
  descriptionFather: FormControl<string | null>;
  onlyPath: FormControl<string | null>;
  path: FormControl<string | null>;
  itemFather: FormControl<string | null>;
  visible: FormControl<boolean | null>;
  isFather: FormControl<boolean | null>;
}

@Component({
  selector: 'app-item-registration',
  templateUrl: './item-registration.component.html',
  styleUrls: ['./item-registration.component.scss'],
})
export class ItemRegistrationComponent implements OnInit, OnDestroy {
  @ViewChild(ModalComponent, { static: true })
  modal!: ModalComponent;

  columns: SfGridColumnModel[] = this.createColumns();
  dataSource: GridRow[] = [];
  form = this.createForm();

  constructor(
    private toastService: ToastService,
    private messageService: MessageService,
    private errorHandler: ErrorHandler,
    private itemRepository: ItemRepository
  ) {}

  ngOnInit(): void {
    this.loadData();
    this.registerEvents();
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
      ? this.itemRepository.updateById(model)
      : this.itemRepository.add(model)
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

  private registerEvents(): void {
    const controls = this.form.controls;

    controls.isFather.valueChanges.pipe(untilDestroyed(this)).subscribe(
      (value) => {
        this.changeFormField(value as boolean);
        if (value) {
          controls.descriptionFather.setValidators([Validators.required]);
          controls.itemFather.setValidators([Validators.required]);
        } else {
          controls.descriptionFather.clearValidators();
          controls.itemFather.clearValidators();
        }
        this.form.updateValueAndValidity();
      },
      (error) => this.handleError(error)
    );
  }

  private changeFormField(isFather: boolean): void {
    const controls = this.form.controls;
    if (isFather) {
      controls.descriptionFather.enable();
      controls.itemFather.enable();
      return;
    }
    controls.descriptionFather.disable();
    controls.itemFather.disable();
  }

  private async onOpen(id?: number): Promise<void> {
    this.reset();
    try {
      if (id) {
        await this.findItem(id);
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
    this.itemRepository
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
    this.itemRepository
      .findAll()
      .pipe(untilDestroyed(this))
      .subscribe(
        async (items) => {
          const dataSource: GridRow[] = [];

          for (const item of items) {
            dataSource.push({
              id: item.id,
              description: item.description,
              descriptionFather: item.descriptionFather,
              visible: item.visible,
            });
          }
          this.dataSource = dataSource;
        },
        (error) => this.handleError(error)
      );
  }

  private async  findItem(id: number): Promise<void> {
    this.itemRepository
      .findById(id)
      .pipe(untilDestroyed(this))
      .subscribe((item) => {
        this.populateForm(item);
      });
  }

  private populateForm(item: Item): void {
    this.form.patchValue({
      id: item.id.toString(),
      description: item.description,
      descriptionFather: item.descriptionFather,
      itemFather: item.itemFather,
      visible: item.visible,
      onlyPath: item.onlyPath,
      path: item.path,
    });
  }

  private getModel(): Item {
    const model = new Item();
    const formValue = this.form.getRawValue();
    model.id = formValue.id === NEW_ID ? 0 : Number(formValue.id);
    model.description = formValue.description as string;
    model.descriptionFather = formValue.descriptionFather as string;
    model.onlyPath = formValue.onlyPath as string;
    model.path = formValue.path as string;
    model.visible = formValue.visible as boolean;
    model.itemFather = formValue.itemFather as string;
    return model;
  }

  private reset(): void {
    this.form.reset({
      id: NEW_ID,
      visible: true,
    });
  }

  private handleError(error: unknown): void {
    this.errorHandler.present(error);
  }

  private createForm(): FormGroup<FormModel> {
    return new FormGroup<FormModel>({
      id: new FormControl<string | null>({ value: NEW_ID, disabled: true }),
      description: new FormControl<string | null>(null, [
        Validators.required,
        Validators.maxLength(200),
      ]),
      descriptionFather: new FormControl<string | null>(null, [
        Validators.maxLength(200),
      ]),
      itemFather: new FormControl<string | null>(null, [
        Validators.maxLength(200),
      ]),
      onlyPath: new FormControl<string | null>(null, [
        Validators.required,
        Validators.maxLength(200),
      ]),
      path: new FormControl<string | null>(null, [
        Validators.required,
        Validators.maxLength(300),
      ]),
      visible: new FormControl<boolean | null>(true),
      isFather: new FormControl<boolean | null>(false),
    });
  }

  private createColumns() {
    return SfGridColumns.build<GridRow>({
      id: SfGridColumns.text('id', 'Código').minWidth(100).isPrimaryKey(true),
      description: SfGridColumns.text('description', 'Descrição').minWidth(200),
      descriptionFather: SfGridColumns.text(
        'descriptionFather',
        'Descrição Pai'
      ).minWidth(100),
      visible: SfGridColumns.boolean('visible', 'Visível').minWidth(100),
    });
  }
}
