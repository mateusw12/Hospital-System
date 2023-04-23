const REGEX_ESCAPE_PATTERN = new RegExp(
  '([\\.\\\\\\+\\*\\?\\[\\^\\]\\$\\(\\)\\{\\}\\=\\!\\<\\>\\|\\:\\-])',
  'g'
);

export function escape(pattern: string) {
  return pattern.replace(REGEX_ESCAPE_PATTERN, '\\$1');
}
