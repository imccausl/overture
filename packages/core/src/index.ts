import { createElement } from './element/index.js'
import * as hooks from './hooks/index.js'

export type * from './element/index.js'

export default {
    createElement,
    ...hooks,
}
