import {
    type PrerenderedElement,
    type PrerenderedFunctionalElement,
} from '../index.js'

export const isFunctionalComponent = <T extends Record<string, unknown>>(
    element: PrerenderedElement<T>,
): element is PrerenderedFunctionalElement<T> => {
    return typeof element.type === 'function'
}
