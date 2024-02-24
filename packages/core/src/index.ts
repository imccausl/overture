import { createElement } from './element/index.js'
import * as hooks from './hooks/index.js'

export type * from './element/index.js'

const { useState } = hooks

const Overture = {
    createElement,
    ...hooks,
}

export default Overture
export { useState }
