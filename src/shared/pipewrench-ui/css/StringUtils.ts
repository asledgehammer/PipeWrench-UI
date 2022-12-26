/**
 * Converts 'kebab-case' strings to 'camelCase' strings.
 *
 * @param kebab The kebab to transform.
 * @returns The 'camelCased' string. If null is passed, null is returned. If an empty string is passed, an empty
 * string is returned.
 */
export const kebabtoCamelCase = (kebab: string): string | null => {
  if (kebab == null) return null;
  else if (kebab.length === 0) return '';
  let a = '';
  let b = false;
  for (let i = 0; i < kebab.length; i++) {
    const c = kebab.charAt(i);
    if (c === '-' || c === '_' || c === ' ') b = true;
    else if (b) {
      a += c.toUpperCase();
      b = false;
    } else a += c;
  }
  return a;
};

/**
 * Converts 'camelCase' strings to 'kebab-strings' strings.
 *
 * @param camel The camel to transform.
 * @returns The 'kebab-case' string. If null is passed, null is returned. If an empty string is passed, an empty
 * string is returned.
 */
export const cameltoKebabCase = (camel: string): string | null => {
  if (camel == null) return null;
  else if (camel.length === 0) return '';
  let a = '';
  for (let i = 0; i < camel.length; i++) {
    a += containsUppercase(camel[i]) ? `-${camel[i].toLowerCase()}` : camel[i];
  }
  return a;
};

const A_Code = `A`.charCodeAt(0);
const Z_Code = 'Z'.charCodeAt(0);
/**
 * @param s The string to test.
 * @returns True if the string contains any upper-case letter.
 */
const containsUppercase = (s: string): boolean => {
  if (s == null || s.length === 0) return false;
  for (let i = 0; i < s.length; i++) {
    const a = s.charCodeAt(i);
    if (A_Code <= a && a <= Z_Code) return true;
  }
  return false;
};

const startsWith = (
  s: string,
  match: string,
  ignoreCase: boolean = false
): boolean => {
  return ignoreCase
    ? s.toLowerCase().indexOf(match.toLowerCase()) === 0
    : s.indexOf(match) === 0;
};
