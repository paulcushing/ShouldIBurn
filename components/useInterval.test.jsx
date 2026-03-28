import { render } from '@testing-library/react'
import { useState } from 'react'
import { useInterval } from './useInterval'

function TestComponent({ callback, delay }) {
  const [count, setCount] = useState(0)
  useInterval(() => {
    callback()
    setCount((v) => v + 1)
  }, delay)
  return <div>{count}</div>
}

describe('useInterval', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('calls callback repeatedly when delay is set', () => {
    const callback = vi.fn()
    render(<TestComponent callback={callback} delay={1000} />)

    vi.advanceTimersByTime(3100)
    expect(callback).toHaveBeenCalledTimes(3)
  })

  it('does not schedule interval when delay is null', () => {
    const callback = vi.fn()
    render(<TestComponent callback={callback} delay={null} />)

    vi.advanceTimersByTime(3000)
    expect(callback).not.toHaveBeenCalled()
  })
})
