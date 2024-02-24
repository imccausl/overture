/** @jsx Overture.createElement */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import Overture, { type PropsWithChildren } from '@overture/core'
import { render } from '@overture/test-utils'
import { screen } from '@testing-library/dom'
import { userEvent } from '@testing-library/user-event'

const TestComponent = () => {
    const [count, setCount] = Overture.useState(0)
    const myVariable = 'hello, world'
    return (
        <div>
            <p>Count: {count}</p>
            <p>Something: {myVariable}</p>
            <button onClick={() => setCount(count + 1)}>Increase Count</button>
        </div>
    )
}

afterEach(() => {
    document.body.innerHTML = ''
})

it('updates state on button click', async () => {
    const user = userEvent.setup()
    render(<TestComponent />)
    screen.debug()
    // expect(screen.getByText('Count: 0')).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: /increase count/i }))
    // expect(screen.getByText('Count: 1')).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: /increase count/i }))
    // expect(screen.getByText('Count: 2')).toBeInTheDocument()
})
