/** @jsx Overture.createElement */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import Overture from '@overture/core'

import { Button } from './Button/index.js'
import { InputText } from './InputText/index.js'

const App = () => {
  return (
    <main>
      <h1>Hello World</h1>
      <Button onClick={() => alert('Hello World')}>Click me</Button>
      <div>
        <InputText label="Name:" />
      </div>
      <div>
        <InputText label="Fun Fact:" />
      </div>
    </main>
  )
}

export default App
