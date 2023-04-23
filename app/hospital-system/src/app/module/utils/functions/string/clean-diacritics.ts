import { Nilable, getString } from '@module/utils/internal';
import * as removeAccents from 'remove-accents';

export function cleanDiacritics(value: Nilable<string>): string {
  return removeAccents.remove(getString(value));
}
