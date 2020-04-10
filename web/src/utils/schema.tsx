import PasswordValidator from 'password-validator'

export const PasswordSchema = new PasswordValidator()
PasswordSchema
  .is()
  .min(8)
  .is()
  .max(100)
  .has()
  .lowercase()
  .has()
  .uppercase()
