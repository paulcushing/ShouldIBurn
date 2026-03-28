import getCoordinatesByCityZip from './getCoordinatesByCityZip'

describe('getCoordinatesByCityZip', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
  })

  it('posts zip payload and returns object response', async () => {
    const fetchMock = vi.spyOn(global, 'fetch').mockResolvedValue({
      json: vi.fn().mockResolvedValue({ lat: 43.6, lon: -116.2 }),
    })

    const result = await getCoordinatesByCityZip('83709')

    expect(fetchMock).toHaveBeenCalledWith(
      'http://localhost:3000/api/getcoordinates',
      expect.objectContaining({
        method: 'post',
        body: JSON.stringify({ zipcode: '83709' }),
      })
    )
    expect(result).toEqual({ lat: 43.6, lon: -116.2 })
  })

  it('normalizes city,state and returns first item when API returns array', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValue({
      json: vi.fn().mockResolvedValue([{ lat: 43.54, lon: -116.56 }]),
    })

    const result = await getCoordinatesByCityZip('Boise, ID')

    expect(fetch).toHaveBeenCalledWith(
      'http://localhost:3000/api/getcoordinates',
      expect.objectContaining({
        body: JSON.stringify({ city: 'Boise,ID' }),
      })
    )
    expect(result).toEqual({ lat: 43.54, lon: -116.56 })
  })
})
