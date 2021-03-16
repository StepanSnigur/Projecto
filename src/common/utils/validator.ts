class Validator {
  private testStr: string
  public errors: string[]

  constructor(str: string) {
    this.testStr = str
    this.errors = []
  }

  addError = (errorMsg: string) => {
    if (!this.errors.includes(errorMsg)) this.errors.push(errorMsg)
  }
  getErrors = () => this.errors

  minLength(
    length: number,
    errorMsg: string = `Incorrect length, minimal length is ${length}`
  ) {
    if (this.testStr.length < length) this.addError(errorMsg)
    return this
  }
  maxLength(
    length: number,
    errorMsg: string = `Incorrect length, minimal length is ${length}`
  ) {
    if (this.testStr.length > length) this.addError(errorMsg)
    return this
  }
  mustIncludeCharacters(
    characters: string[] | RegExp[],
    errorMsg: string = 'Must include required characters'
  ) {
    characters.forEach((character: string | RegExp) => {
      if (character instanceof RegExp) {
        const characterMatches = this.testStr.match(character)
        if (characterMatches === null) this.addError(errorMsg)
      } else if (typeof character === 'string' && !this.testStr.includes(character)) {
        this.addError(errorMsg)
      }
    })
    return this
  }
  mustMatchRegExp(
    regexp: RegExp,
    errorMsg: string = 'Not valid'
  ) {
    if (!regexp.test(this.testStr)) this.addError(errorMsg)
    return this
  }
}

export default Validator
