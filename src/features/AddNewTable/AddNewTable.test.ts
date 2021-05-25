import {
  asyncThrottle,
  removeCurrentUserFromSearchList,
  getUniqueArr
} from './utils'

describe('Throttle function', () => {
  it('Correct calls function', () => {
    const mockFn = jest.fn()
    const fn = asyncThrottle(mockFn, 500)
    for (let i = 1; i <= 20; i++) {
      fn()
    }
    expect(mockFn).not.toBeCalled()
  })
  it('Returns correct value',  () => {
    const TEST_VALUE = 'test value'
    const testFn = () => {
      return Promise.resolve(TEST_VALUE)
    }
    const ITERATIONS_COUNT = 20
    const fn = asyncThrottle(testFn, 500)
    for (let i = 1; i <= ITERATIONS_COUNT; i++) {
      fn()
    }

    return fn().then(data => {
      expect(data).toEqual(TEST_VALUE)
    })
  })
  it('Calls function after delay', async () => {
    jest.useFakeTimers()

    const testFn = jest.fn()
    const fn = asyncThrottle(testFn, 100)
    fn()
    jest.advanceTimersByTime(100)

    expect(testFn).toBeCalledTimes(1)
  })
})

describe('Remove current user from search list',  () => {
  it('Correct remove current user from search list', () => {
    const userId = '3'
    const testArray = [
      {email: 'test1', _id: '1'},
      {email: 'test2', _id: '2'},
      {email: 'test3', _id: '3'}
    ]
    const resultArr = [
      {email: 'test1', _id: '1'},
      {email: 'test2', _id: '2'}
    ]
    // @ts-ignore
    expect(removeCurrentUserFromSearchList(testArray, userId)).toEqual(resultArr)
  })
})

describe('getUniqueArr', () => {
  it('Returns unique array', () => {
    const testArr = [
      {value: 1, _id: 1},
      {value: 2, _id: 2},
      {value: 3, _id: 3},
      {value: 4, _id: 4},
      {value: 4, _id: 4},
      {value: 1, _id: 1}
    ]
    const expectation = [
      {value: 1, _id: 1},
      {value: 2, _id: 2},
      {value: 3, _id: 3},
      {value: 4, _id: 4}
    ]

    expect(getUniqueArr(testArr)).toEqual(expectation)
  })
})
