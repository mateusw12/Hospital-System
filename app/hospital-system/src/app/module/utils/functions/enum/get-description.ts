import { Enum, Nilable } from '@module/utils/internal';
import { getDescriptor } from './descriptor';

export function getDescription<T>(
  enumeration: Enum<T>,
  value: Nilable<string>
): string {
  const descriptor = getDescriptor(enumeration);
  if (!descriptor) return '';

  for (const key in enumeration) {
    if (enumeration.hasOwnProperty(key)) {
      const enumValue = enumeration[key];
      if (enumValue === value) {
        return descriptor.description[key] as string;
      }
    }
  }
  return '';
}
