// utils/generateCode.ts

/**
 * Generates a random verification code.
 * @param length - Number of characters in the code (default is 6)
 * @param onlyNumbers - If true, generates digits only; otherwise, alphanumeric
 * @returns A random code as a string
 */
export function generateCode(length = 6, onlyNumbers = true): string {
  const characters = onlyNumbers
    ? '0123456789'
    : 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  let code = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    code += characters[randomIndex];
  }

  return code;
}
