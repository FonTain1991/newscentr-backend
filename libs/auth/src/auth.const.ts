export const AUTH = {
  RECOVERY_TOKEN_EXPIRES: 1000 * 60 * 5,
  PASSWORD_MISMATCH: 'Пароли не совпадают.',
  TOKEN_INVALID: 'Срок действия токена истек. Повторите еще раз',
  PASSWORD_BE_DIFFERENT: 'Новый пароль должен отличаться от предыдущих использованных паролей.'
}
export const SALT: number = 10