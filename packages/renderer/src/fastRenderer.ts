import { applyAttributes } from './applyAttributes.js'

import type {
    PrerenderedElement,
    PropsWithChildren,
} from '../../core/src/element/index.js'

const renderElement = <T extends Record<string, unknown>>(
    element: PrerenderedElement<PropsWithChildren<T>>,
) => {}
export const fastRenderer = <T extends Record<string, unknown>>(
    element: PrerenderedElement<PropsWithChildren<T>>,
) => {}
