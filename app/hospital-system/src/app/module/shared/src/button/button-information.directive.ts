import { Directive, Injector } from '@angular/core';
import { ButtonBase } from './button.directive';

@Directive({ selector: '[buttonInformation]' })
export class ButtonInformationDirective extends ButtonBase {
  constructor(injector: Injector) {
    super(injector);
    this.cssClass = 'e-info';
    this.iconCss = 'e-icons e-circle-info';
    this.content = 'Informações';
  }
}
