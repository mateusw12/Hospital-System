import { ValidatorFn, AbstractControl, ValidationErrors } from "@angular/forms";
import { DOMAIN_REGEXP, HOSTNAME_REGEXP, URL_REGEXP } from "../constant";

/**
 *
 * Função que realiza a validação de url
 *
 * @param webSite
 * @returns
 */

export function isWebSite(webSite: string): boolean {
    if (!webSite) return false;
    if (HOSTNAME_REGEXP.test(webSite)) return true;
    if (DOMAIN_REGEXP.test(webSite)) return true;
    if (URL_REGEXP.test(webSite)) return true;
    return false;
  }

  export function webSiteValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const webSite = control.value;
      if (!webSite || !isWebSite(webSite)) {
        return { cpf: 'Web Site inválido' };
      }
      return null;
    };
  }
