import { Directive, Injector } from '@angular/core';
import { ButtonBase } from './button.directive';

@Directive({ selector: '[buttonLicense]' })
export class ButtonLicenseDirective extends ButtonBase {
  constructor(injector: Injector) {
    super(injector);
    this.cssClass = 'e-info-medium';
    this.iconCss = 'bi bi-file-earmark-lock';
    this.content = 'Licenças';
  }
}
