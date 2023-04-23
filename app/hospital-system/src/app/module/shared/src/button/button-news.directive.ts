import { Directive, Injector } from '@angular/core';
import { ButtonBase } from './button.directive';

@Directive({ selector: '[buttonNews]' })
export class ButtonNewsDirective extends ButtonBase {
  constructor(injector: Injector) {
    super(injector);
    this.cssClass = 'e-info-dark';
    this.iconCss = 'bi bi-newspaper';
    this.content = 'Notícias';
  }
}
