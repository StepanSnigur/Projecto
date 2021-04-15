import { ITableMember } from './AddNewTable'

export const asyncThrottle = (
  callback: (...args: any) => any,
  timeout: number
) => {
  console.log('called')
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
        reject(e)
      }
    }, timeout)
  })
}
