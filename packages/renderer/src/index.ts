import { fastRenderer } from './fastRenderer.js'

import type { PrerenderedElement } from '../../core/src/element/index.js'

let element: HTMLElement | null = null
let rootComponent: any = null

let renderFunc: (component: PrerenderedElement<any>) => void = (
    _: PrerenderedElement<any>,
) => {
    throw new Error(
        'No renderer has been set up yet. Make sure to call createRoot.',
    )
}

export const rerender = () => {
    if (rootComponent === null) {
        throw new Error('No component has been rendered yet')
    }
    // renderFunc(rootComponent)
}

const createRootWithRenderer = <T extends Record<string, unknown>>(
    container: HTMLElement,
    renderer: (
        component: PrerenderedElement<T>,
        container: HTMLElement,
    ) => void,
) => {
    element = container
    renderFunc = (component: PrerenderedElement<T>) => {
        rootComponent = component
        element.innerHTML = ''
        renderer(component, element)
    }
    return {
        render: renderFunc,
    }
}

export const createRoot = <T extends Record<string, unknown>>(
    container: HTMLElement,
) => createRootWithRenderer<T>(container, fastRenderer)

export type { Fiber } from './fastRenderer.js'
