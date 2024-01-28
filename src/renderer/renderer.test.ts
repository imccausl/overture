import { screen, within } from '@testing-library/dom'
import { createElement } from '../client/index.js'
import { render } from '../testUtils/render.js'
import userEvent from '@testing-library/user-event'

it('renders an element to the DOM', () => {
  const element = createElement('h1', { children: 'Hello world' })
  render(element)

  expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument()
})

it('renders a nested element to the DOM', () => {
  type ElementProps = {
    'data-testid'?: string
  }

  const element = createElement<ElementProps>(
    'div',
    { 'data-testid': 'parent' },
    createElement(
      'h1',
      { 'data-testid': 'child1' },
      createElement('span', { 'data-testid': 'child2' })
    )
  )
  render(element)
  screen.debug()
  const withinParent = within(screen.getByTestId('parent'))

  expect(withinParent.getByRole('heading', { level: 1 })).toBeInTheDocument()
  expect(withinParent.getByTestId('child1')).toBeInTheDocument()
})

it.only('adds click handler to element', async () => {
  const onClick = vi.fn()
  const element = createElement('button', { onClick }, 'click me')
  const user = userEvent.setup()
  render(element)

  await user.click(screen.getByRole('button', { name: 'click me' }))

  expect(onClick).toHaveBeenCalledTimes(1)
})
