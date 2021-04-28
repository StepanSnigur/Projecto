import { ITableMember } from './AddNewTable'

export const asyncThrottle = (
  callback: (...args: any) => any,
  timeout: number
) => {
  let isCalled = false
  let timer: ReturnType<typeof setTimeout> | null = null

  return (...args: any) => new Promise<ITableMember[]>((resolve, reject) => {
    if (isCalled && timer) clearTimeout(timer)
    isCalled = true
    timer = setTimeout(async () => {
      try {
        const res: ReturnType<typeof callback> = await callback(...args)
        resolve(res)
        isCalled = false
      } catch (e) {
        reject(e.message)
      }
    }, timeout)
  })
}

const getArrIds = (arr: any[]) => arr.map(el => el.id)
export const getUniqueArr = (arr: any[]) => {
  const res: any[] = []

  const ids = getArrIds(arr)
  const uniqueIds = new Set(ids)
  uniqueIds.forEach(id => {
    const uniqueEl = arr.find(el => el.id === id)
    res.push(uniqueEl)
  })

  return res
}

export const removeCurrentUserFromSearchList = (list: ITableMember[], currentUserId: string): ITableMember[] => {
  return list.filter(member => member.id !== currentUserId)
}
