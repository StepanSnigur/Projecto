export const isHexColor = (str: string) => /^#/.test(str)
export const moveToPosition = (list: any[], deleteFrom: number, insertTo: number): any[] => {
  let listToChange = [...list]
  const itemToMove = listToChange.splice(deleteFrom, 1)[0]
  listToChange.splice(insertTo, 0, itemToMove)
  return listToChange
}
