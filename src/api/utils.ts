type objWithId = {
  id: string
}
export const getArrayIds = <T extends objWithId>(el: T): string => el.id
