import { throttle } from './utils'

describe('Throttle function', () => {
  it('correct calls function', () => {
    const mockFn = jest.fn()
    const fn = throttle(mockFn, 500)
    for (let i = 1; i <= 20; i++) {
      fn()
    }
    expect(mockFn).toBeCalledTimes(1)
  })
})
