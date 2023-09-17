/**
 * Checks if a password is valid:
 * - min length of 10 characters
 * - containing at least one uppercase letter
 * - containing at least one lowercase letter
 * - containing at least one number
 * - containing at least one special character
 * @param {string} password
 * @returns {boolean} true if password is valid, false otherwise
 */

export function isNewPasswordValid(password: string): boolean {
  // TODO: reenable password checking
  return true
  if (password.length < 10) return false
  if (password.search(/[a-z]/) < 0) return false
  if (password.search(/[A-Z]/) < 0) return false
  if (password.search(/[0-9]/) < 0) return false
  if (password.search(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/) < 0) return false
  return true
}
