import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Begin from './begin'

describe('Begin', () => {
  it('updates location text and triggers handlers', async () => {
    const user = userEvent.setup()
    const setPermissionGranted = vi.fn()
    const sethaveUserCityZip = vi.fn()
    const setUserCityZip = vi.fn()

    render(
      <Begin
        setPermissionGranted={setPermissionGranted}
        sethaveUserCityZip={sethaveUserCityZip}
        setUserCityZip={setUserCityZip}
        userCityZip=""
      />
    )

    await user.click(screen.getByRole('button', { name: 'Locate Me' }))
    expect(setPermissionGranted).toHaveBeenCalledWith(true)

    await user.type(screen.getByPlaceholderText('City or Zip Code'), 'Boise, ID')
    expect(setUserCityZip).toHaveBeenCalled()

    await user.click(screen.getByRole('button', { name: 'Go' }))
    expect(sethaveUserCityZip).toHaveBeenCalledWith(true)
  })
})
