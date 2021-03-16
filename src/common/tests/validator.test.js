import Validator from '../utils/validator'

describe('validator', () => {
  it('Return correct error message', () => {
    const mockError = 'mock error'
    const error = new Validator('test').maxLength(1, mockError).getErrors()[0]
    expect(error).toEqual(mockError)
  })
  it('Correct define minimal string length', () => {
    const errors1 = new Validator('test string').minLength(11).getErrors()
    const errors2 = new Validator('test string').minLength(15).getErrors()
    expect(errors1.length).toEqual(0)
    expect(errors2.length).toEqual(1)
  })
  it('Correct define maximal string length', () => {
    const errors1 = new Validator('test').maxLength(5).getErrors()
    const errors2 = new Validator('test').maxLength(3).getErrors()
    expect(errors1.length).toEqual(0)
    expect(errors2.length).toEqual(1)
  })
  it('Correct find include characters', () => {
    const errors1 = new Validator('test@test').mustIncludeCharacters(['@']).getErrors()
    const errors2 = new Validator('test@test').mustIncludeCharacters(['#']).getErrors()
    expect(errors1.length).toEqual(0)
    expect(errors2.length).toEqual(1)
  })
  it('Correct match regexp', () => {
    const errors1 = new Validator('test@test').mustMatchRegExp(/test/g).getErrors()
    const errors2 = new Validator('test@test').mustMatchRegExp(/123/g).getErrors()
    expect(errors1.length).toEqual(0)
    expect(errors2.length).toEqual(1)
  })
})
