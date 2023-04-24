import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { StyleSideBarSettings } from '@module/models';
import { StyleSideBarSettingsRepository } from '@module/repository';
import { untilDestroyed, untilDestroyedAsync } from '@module/utils/common';
import { markAllAsTouched } from '@module/utils/forms';
import {
  ErrorHandler,
  MenuService,
  MessageService,
  ToastService,
} from '@module/utils/services';
import {
  DirectionColor,
  directionGradientColor,
} from './direction-gradient-color';

const NEW_ID = 'NOVO';

interface FormModel {
  id: FormControl<string | null>;
  hospitalId: FormControl<number | null>;
  onlyColorSideBar: FormControl<string | null>;
  firstColorSideBar: FormControl<string | null>;
  secondColorSideBar: FormControl<string | null>;
  isGradient: FormControl<boolean | null>;
  directionGradient: FormControl<string | null>;
  colorTextSideBar: FormControl<string | null>;
  menuColorSideBar: FormControl<string | null>;
  menuHoverColorSideBar: FormControl<string | null>;
  colorPickerTextSideBar: FormControl<string | null>;
  onlyColorPickerSideBar: FormControl<string | null>;
  firstColorGradientPickerSideBar: FormControl<string | null>;
  secondColorGradientPickerSideBar: FormControl<string | null>;
  menuHoverColorPickerSideBar: FormControl<string | null>;
  menuColorPickerSideBar: FormControl<string | null>;
}

@Component({
  selector: 'app-style-side-bar',
  templateUrl: './style-side-bar.component.html',
})
export class StyleSideBarComponent implements OnInit, OnDestroy {
  form = this.createForm();

  directionGradientColors: DirectionColor[] = directionGradientColor;

  private hospitalId = 0;

  constructor(
    private toastService: ToastService,
    private errorHandler: ErrorHandler,
    private menuService: MenuService,
    private messageService: MessageService,
    private styleSideBarSettingsRepository: StyleSideBarSettingsRepository
  ) {}

  ngOnInit(): void {
    this.changeFormField(false);
    this.formEvents();
  }

  onSaveClick(): void {
    if (this.form.invalid) {
      markAllAsTouched(this.form);
      return;
    }
    const model = this.getModel();

    this.styleSideBarSettingsRepository
      .add(model)
      .pipe(untilDestroyed(this))
      .subscribe(
        () => {
          this.toastService.showSuccess();
          this.form.reset();
          this.loadData();
        },
        (error) => this.handleError(error)
      );
  }

  async onRemoveClick(): Promise<void> {
    const id = Number(this.form.controls.id.value);
    const confirmed = await this.messageService.showConfirmDelete();
    if (!confirmed) return;

    this.styleSideBarSettingsRepository
      .deleteById(id)
      .pipe(untilDestroyed(this))
      .subscribe(
        () => {
          this.toastService.showRemove();
          this.form.reset({ hospitalId: this.hospitalId });
          this.loadData();
        },
        (error) => this.handleError(error)
      );
  }

  ngOnDestroy(): void {}

  private formEvents(): void {
    const controls = this.form.controls;

    controls.colorPickerTextSideBar.valueChanges
      .pipe(untilDestroyed(this))
      .subscribe(
        (value) => {
          controls.colorTextSideBar.setValue(value);
        },
        (error) => this.handleError(error)
      );

    controls.firstColorGradientPickerSideBar.valueChanges
      .pipe(untilDestroyed(this))
      .subscribe(
        (value) => {
          controls.firstColorSideBar.setValue(value);
        },
        (error) => this.handleError(error)
      );

    controls.secondColorGradientPickerSideBar.valueChanges
      .pipe(untilDestroyed(this))
      .subscribe(
        (value) => {
          controls.secondColorSideBar.setValue(value);
        },
        (error) => this.handleError(error)
      );

    controls.onlyColorPickerSideBar.valueChanges
      .pipe(untilDestroyed(this))
      .subscribe(
        (value) => {
          controls.onlyColorSideBar.setValue(value);
        },
        (error) => this.handleError(error)
      );

    controls.menuColorPickerSideBar.valueChanges
      .pipe(untilDestroyed(this))
      .subscribe(
        (value) => {
          controls.menuColorSideBar.setValue(value);
        },
        (error) => this.handleError(error)
      );

    controls.menuHoverColorPickerSideBar.valueChanges
      .pipe(untilDestroyed(this))
      .subscribe(
        (value) => {
          controls.menuHoverColorSideBar.setValue(value);
        },
        (error) => this.handleError(error)
      );

    controls.isGradient.valueChanges.pipe(untilDestroyed(this)).subscribe(
      (value) => {
        this.changeFormField(value as boolean);
      },
      (error) => this.handleError(error)
    );
  }

  private async loadData(): Promise<void> {
    const hospitalId = await this.getActiveHospital();
    this.styleSideBarSettingsRepository
      .findAll(hospitalId)
      .pipe(untilDestroyed(this))
      .subscribe(
        (styleSideBarSettings) => {
          this.populateForm(styleSideBarSettings);
        },
        async (error) => {
          const errorHandler = await this.errorHandler.handle(error);
          if (errorHandler.status === 404) return;
          this.handleError(error);
        }
      );
  }

  private async getActiveHospital(): Promise<number> {
    const hospital = await untilDestroyedAsync(
      this.menuService.getActiveHospital(),
      this
    );
    this.hospitalId = hospital.id;
    return hospital.id;
  }

  private resetColorFields(): void {
    this.form.patchValue({
      onlyColorPickerSideBar: null,
      onlyColorSideBar: null,
      firstColorGradientPickerSideBar: null,
      firstColorSideBar: null,
      secondColorGradientPickerSideBar: null,
      secondColorSideBar: null,
      directionGradient: null,
    });
  }

  private changeFormField(isGradient: boolean): void {
    const controls = this.form.controls;
    this.resetColorFields();

    if (isGradient) {
      controls.onlyColorPickerSideBar.disable();
      controls.onlyColorSideBar.disable();
      controls.firstColorGradientPickerSideBar.enable();
      controls.secondColorGradientPickerSideBar.enable();
      controls.directionGradient.enable();
      return;
    }
    controls.onlyColorPickerSideBar.enable();
    controls.onlyColorSideBar.enable();
    controls.firstColorGradientPickerSideBar.disable();
    controls.secondColorGradientPickerSideBar.disable();
    controls.menuColorSideBar.disable();
    controls.menuHoverColorSideBar.disable();
    controls.directionGradient.disable();
  }

  private populateForm(styleSideBarSettings: StyleSideBarSettings): void {
    this.form.patchValue({
      colorTextSideBar: styleSideBarSettings.colorTextSideBar,
      directionGradient: styleSideBarSettings.directionGradient,
      firstColorSideBar: styleSideBarSettings.firstColorSideBar,
      id: styleSideBarSettings.id.toString(),
      isGradient: styleSideBarSettings.isGradient,
      menuColorSideBar: styleSideBarSettings.menuColorSideBar,
      menuHoverColorSideBar: styleSideBarSettings.menuHoverColorSideBar,
      onlyColorSideBar: styleSideBarSettings.onlyColorSideBar,
      secondColorSideBar: styleSideBarSettings.secondColorSideBar,
      hospitalId: styleSideBarSettings.hospitalId,
    });
  }

  private getModel(): StyleSideBarSettings {
    const model = new StyleSideBarSettings();
    const formValue = this.form.getRawValue();
    model.colorTextSideBar = formValue.colorTextSideBar as string;
    model.directionGradient = formValue.directionGradient as string;
    model.firstColorSideBar = formValue.firstColorSideBar as string;
    model.secondColorSideBar = formValue.secondColorSideBar as string;
    model.menuColorSideBar = formValue.menuColorSideBar as string;
    model.menuHoverColorSideBar = formValue.menuHoverColorSideBar as string;
    model.onlyColorSideBar = formValue.onlyColorSideBar as string;
    model.isGradient = formValue.isGradient as boolean;
    model.id = formValue.id === NEW_ID ? 0 : Number(formValue.id);
    model.hospitalId = this.hospitalId as number;
    return model;
  }

  private handleError(error: unknown): void {
    this.errorHandler.present(error);
  }

  private createForm(): FormGroup<FormModel> {
    return new FormGroup<FormModel>({
      id: new FormControl<string | null>({ value: NEW_ID, disabled: true }),
      hospitalId: new FormControl<number | null>(null),
      colorTextSideBar: new FormControl<string | null>({
        value: '',
        disabled: true,
      }),
      directionGradient: new FormControl<string | null>(null),
      firstColorSideBar: new FormControl<string | null>({
        value: '',
        disabled: true,
      }),
      secondColorSideBar: new FormControl<string | null>({
        value: '',
        disabled: true,
      }),
      menuColorSideBar: new FormControl<string | null>(null, [
        Validators.required,
      ]),
      menuHoverColorSideBar: new FormControl<string | null>(null, []),
      onlyColorSideBar: new FormControl<string | null>(null),
      colorPickerTextSideBar: new FormControl<string | null>(null),
      firstColorGradientPickerSideBar: new FormControl<string | null>(null),
      secondColorGradientPickerSideBar: new FormControl<string | null>(null),
      onlyColorPickerSideBar: new FormControl<string | null>(null),
      menuColorPickerSideBar: new FormControl<string | null>(
        null,
        Validators.required
      ),
      menuHoverColorPickerSideBar: new FormControl<string | null>(
        null,
        Validators.required
      ),
      isGradient: new FormControl<boolean | null>(false),
    });
  }
}
