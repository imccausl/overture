/** @jsx Overture.createElement */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import Overture, { type PropsWithChildren } from '@overture/core'
import { screen, within } from '@testing-library/dom'
import { render } from '@overture/test-utils'
import { userEvent } from '@testing-library/user-event'

afterEach(() => {
  document.body.innerHTML = ''
})

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

it('renders functional components with children', () => {
  const Component = ({
    children,
  }: PropsWithChildren<Record<string, never>>) => (
    <div data-testid="root-element">{children}</div>
  )

  render(
    <Component>
      <h1>Hello world</h1>
      <p>Some other child</p>
    </Component>
  )

  expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument()
})
