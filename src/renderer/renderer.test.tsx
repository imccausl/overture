/** @jsx Overture.createElement */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import Overture from '../client/index.js'
import { screen, within } from '@testing-library/dom'
import { render } from '../testUtils/render.js'
import { userEvent } from '@testing-library/user-event'

it('renders an element to the DOM', () => {
  render(<h1 data-testid="hello">hello world</h1>)
  screen.debug()
  expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument()
})

it('renders a nested element to the DOM', () => {
  render(
    <div data-testid="parent">
      <h1 data-testid="child1">Hello world</h1>
      <span data-testid="child2">second child</span>
    </div>
  )
  screen.debug()
  const withinParent = within(screen.getByTestId('parent'))

  expect(withinParent.getByRole('heading', { level: 1 })).toBeInTheDocument()
  expect(withinParent.getByTestId('child1')).toBeInTheDocument()
})

it('adds click handler to element', async () => {
  const onClick = vi.fn()
  const user = userEvent.setup()
  render(<button onClick={onClick}>Click Me</button>)

  await user.click(screen.getByRole('button', { name: /click me/i }))

  expect(onClick).toHaveBeenCalledTimes(1)
})
