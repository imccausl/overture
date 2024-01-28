/** @jsx Overture.createElement */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import Overture from '../client/index.js'
import { screen, within } from '@testing-library/dom'
import { render } from '../testUtils/render.js'
import { userEvent } from '@testing-library/user-event'

it('renders an element to the DOM', () => {
  render(<h1 data-testid="hello">hello world</h1>)
  expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument()
})

it('renders a nested element to the DOM', () => {
  render(
    <div data-testid="parent">
      <h1 data-testid="child1">Hello world</h1>
      <span data-testid="child2">second child</span>
    </div>
  )
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

it.only('renders a tree that contains functional components', () => {
  const Component = (props: {
    id?: string
    className?: string
    'data-testid'?: string
  }) => (
    <div data-testid="root-element" {...props}>
      Hello world
    </div>
  )

  const SubComponent = (props: { id: string; className: string }) => (
    <ul className="fake-styles">
      <li aria-label="list element">
        <Component {...props} />
      </li>
      <li aria-label="list element 2">
        <Component data-testid="second-list-item" {...props} />
      </li>
    </ul>
  )

  render(<SubComponent id="sub" className="sub" />)
  screen.debug()
  expect(screen.getByTestId('root-element')).toHaveTextContent('Hello world')
  expect(screen.getByTestId('root-element')).toHaveAttribute('id', 'sub')
  expect(screen.getByTestId('root-element')).toHaveClass('sub')
})
