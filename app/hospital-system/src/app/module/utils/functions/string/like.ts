import { escape } from '../regex/escape';

export function like(source: string, pattern: string): boolean {
  if (source.toLowerCase() === pattern.toLowerCase()) return true;
  pattern = escape(pattern).replace(/%/g, '.*').replace(/_/g, '.');
  return RegExp(`^${pattern}$`, 'gi').test(source);
}
