/** @jsx Overture.createElement */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import Overture, { useState } from '@overture/core'

import { Button } from './Button/index.js'
import { InputText } from './InputText/index.js'

const handleOnChange = (setState: (value: string) => void) => (event: any) => {
    setState(event.currentTarget.value)
}

const App = () => {
    const [counter, setCounter] = useState(0)
    const [name, setName] = useState('')
    const [funFact, setFunFact] = useState('')
    console.log({ name, funFact })
    return (
        <main>
            <h1>Hello World</h1>
            <p>Counter: {counter} </p>
            <p>Name: {name} </p>
            <p>Fun Fact: {funFact}</p>
            <Button onClick={() => setCounter(counter + 1)}>Click me</Button>
            <div>
                <InputText
                    label="Name:"
                    value={name}
                    onChange={handleOnChange(setName)}
                />
            </div>
            <div>
                <InputText
                    label="Fun Fact:"
                    value={funFact}
                    onChange={handleOnChange(setFunFact)}
                />
            </div>
        </main>
    )
}

export default App
