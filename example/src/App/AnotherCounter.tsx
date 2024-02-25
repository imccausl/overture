/** @jsx Overture.createElement */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import Overture, { useState } from '@overture/core'

import { Button } from './Button/index.js'

const AnotherCounter = () => {
    const [counter, setCounter] = useState(0)

    return (
        <main>
            <h1>Hello Again, World</h1>
            <p>Another Counter: {counter} </p>

            <Button onClick={() => setCounter(counter + 1)}>Click me</Button>
        </main>
    )
}

export default AnotherCounter
