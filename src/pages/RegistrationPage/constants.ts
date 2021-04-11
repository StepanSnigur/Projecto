export const emailRegexp: RegExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
export const minPasswordLength = 7
export const maxPasswordLength = 40
export const requiredPasswordCharacters = [
  { regexp: /\d/g, name: 'числа' },
  { regexp: /[a-z]/g, name: 'буквы' },
  { regexp: /[A-Z]/g, name: 'заглавные буквы' }
]
