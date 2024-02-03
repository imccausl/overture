/** @jsx Overture.createElement */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import Overture from '@overture/core'
import { createRoot } from '@overture/renderer'
import App from './App/index.js'

const rootElement = document.createElement('div')
rootElement.id = 'app-root'
document.body.appendChild(rootElement)

const root = createRoot(rootElement)
root.render(<App />)
