import { recursivelyRenderElement } from './recursiveRenderer.js'

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
    console.log({ rootComponent })
    renderFunc(rootComponent)
}

const createRootWithRenderer = <T extends Record<string, unknown>>(
    rootElement: HTMLElement,
    renderer: (component: PrerenderedElement<T>) => HTMLElement | Text,
) => {
    element = rootElement
    renderFunc = (component: PrerenderedElement<T>) => {
        rootComponent = component
        element.innerHTML = ''
        element.appendChild(renderer(component))
    }
    return {
        render: renderFunc,
    }
}

export const createRoot = <T extends Record<string, unknown>>(
    element: HTMLElement,
) => createRootWithRenderer<T>(element, recursivelyRenderElement)
