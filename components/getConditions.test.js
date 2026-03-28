import getConditions from './getConditions'

describe('getConditions', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
  })

  it('posts coordinates and returns parsed conditions', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValue({
      json: vi.fn().mockResolvedValue({ weather: { wind: { speed: 5 } }, air: [] }),
    })

    const coordinates = { latitude: 43.5, longitude: -116.6 }
    const result = await getConditions(coordinates)

    expect(fetch).toHaveBeenCalledWith(
      'http://localhost:3000/api/conditions',
      expect.objectContaining({
        method: 'post',
        body: JSON.stringify(coordinates),
      })
    )
    expect(result).toEqual({ weather: { wind: { speed: 5 } }, air: [] })
  })

  it('returns fetch error object when request rejects', async () => {
    const error = new Error('network down')
    vi.spyOn(global, 'fetch').mockRejectedValue(error)

    const result = await getConditions({ latitude: 1, longitude: 2 })

    expect(result).toBe(error)
  })
})
