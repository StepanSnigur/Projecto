export const ENTER_KEY_CODE = 13

interface ITranslatedServerErrors {
  [index: string]: string
}
export const translatedServerErrors = {
  'auth/email-already-in-use': 'Такой email уже существует',
  'auth/user-not-found': 'Пользователь не найден',
  'auth/wrong-password': 'Пользователь не найден',
  'auth/invalid-email': 'Невалидный email'
} as ITranslatedServerErrors
