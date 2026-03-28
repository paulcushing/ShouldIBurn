import '@testing-library/jest-dom/vitest'
import React from 'react'
import { vi } from 'vitest'

vi.mock('next/link', () => ({
  default: ({ href, children, ...props }) => React.createElement('a', { href, ...props }, children),
}))
