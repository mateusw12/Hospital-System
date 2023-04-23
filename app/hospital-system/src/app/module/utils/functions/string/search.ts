import { cleanDiacritics } from './clean-diacritics';
import { like } from './like';

export function search(source: string, pattern: string): boolean {
  console.log('source', source, 'pattern', pattern)
  if (!pattern || !source) return false;
  if (!pattern.includes('%')) pattern = `%${pattern.replace(/\s/g, '%')}%`;
  source = cleanDiacritics(source);
  pattern = cleanDiacritics(pattern);
  return like(source, pattern);
}
