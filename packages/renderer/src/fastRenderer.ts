import { HookDispatcher, RenderState } from 'shared'

import { createDOM } from './DOMUtils.js'
import {
    isValidHTMLAttribute,
    removeInvalidAttributes,
} from './HTMLValidators.js'

import type { ElementFn, ElementTypes, PropsWithChildren } from '@overture/core'

export interface Fiber<T extends Record<string, unknown>> {
    dom: HTMLElement | Text | null
    parent?: Fiber<T> | null
    child?: Fiber<T> | null
    sibling?: Fiber<T> | null
    alternate?: Fiber<T> | null
    props: PropsWithChildren<T>
    type: ElementTypes<T>
    effectTag?: 'UPDATE' | 'PLACEMENT' | 'DELETION'
    _ref: any
    hooks?: any[]
}

export function fastRenderer<T extends Record<string, unknown>>(
    element: Fiber<T>,
    container: HTMLElement,
) {
    RenderState.setWipRoot({
        type: container.tagName.toLowerCase(),
        dom: container,
        props: {
            children: [element],
        },
        alternate: RenderState.getCurrentRoot(),
        _ref: null,
    })
    RenderState.resetDeletions()
    RenderState.setNextUnitOfWork(RenderState.getWipRoot())
}

function updateDOM<T extends Record<string, unknown>>(
    dom: HTMLElement | Text,
    prevProps: T,
    nextProps: T,
) {
    if (dom instanceof Text) {
        if (prevProps.nodeValue !== nextProps.nodeValue) {
            if (typeof nextProps.nodeValue !== 'string') {
                throw new Error('Text node value must be a string')
            }
            dom.nodeValue = nextProps.nodeValue
        }
        return
    }

    Object.keys(removeInvalidAttributes(prevProps)).forEach((key) => {
        if (key in nextProps) return
        if (key.startsWith('on')) {
            const event = key.slice(2).toLowerCase()
            dom.removeEventListener(event, prevProps[key] as EventListener)
        } else if (isValidHTMLAttribute(prevProps[key])) {
            dom.removeAttribute(key)
        }
    })

    Object.keys(removeInvalidAttributes(nextProps)).forEach((key) => {
        if (prevProps[key] === nextProps[key]) return
        if (key.startsWith('on')) {
            const event = key.slice(2).toLowerCase()
            dom.addEventListener(event, nextProps[key] as EventListener)
        } else if (isValidHTMLAttribute(nextProps[key])) {
            dom.setAttribute(key, nextProps[key] as string)
        }
    })
}

function commitDeletion<T extends Record<string, unknown>>(
    fiber: Fiber<T>,
    domParent: HTMLElement | Text,
) {
    if (fiber.dom) {
        domParent.removeChild(fiber.dom)
    } else {
        commitDeletion(fiber.child, domParent)
    }
}

function commitWork<T extends Record<string, unknown>>(fiber: Fiber<T>) {
    if (!fiber) return

    let domParentFiber = fiber.parent
    while (!domParentFiber.dom) {
        domParentFiber = domParentFiber.parent
    }
    const domParent = domParentFiber.dom
    if (fiber.effectTag === 'PLACEMENT' && fiber.dom !== null) {
        domParent.appendChild(fiber.dom)
    } else if (fiber.effectTag === 'UPDATE' && fiber.dom !== null) {
        updateDOM(fiber.dom, fiber.alternate.props, fiber.props)
    } else if (fiber.effectTag === 'DELETION') {
        commitDeletion(fiber, domParent)
    }
    commitWork(fiber.child)
    commitWork(fiber.sibling)
}

function commitRoot() {
    RenderState.getDeletions().forEach(commitWork)
    const wipRoot = RenderState.getWipRoot()
    commitWork(RenderState.getWipRoot().child)
    RenderState.setCurrentRoot(wipRoot)
    RenderState.setWipRoot(null)
}

const workLoop: IdleRequestCallback = (deadline) => {
    let shouldYield = false
    let nextUnitOfWork = RenderState.getNextUnitOfWork()

    while (nextUnitOfWork && !shouldYield) {
        nextUnitOfWork = performUnitOfWork(nextUnitOfWork)
        RenderState.setNextUnitOfWork(nextUnitOfWork)
        shouldYield = deadline.timeRemaining() < 1
    }
    if (!nextUnitOfWork && RenderState.getWipRoot()) {
        commitRoot()
    }
    requestIdleCallback(workLoop)
}

requestIdleCallback(workLoop)

function reconcileChildren<T extends Record<string, unknown>>(
    wipFiber: Fiber<T>,
    children: Fiber<T>[],
) {
    let index = 0
    let oldFiber = wipFiber.alternate?.child
    let prevSibling: Fiber<T> = null

    while (index < children.length || oldFiber) {
        const element = children[index]
        let newFiber: Fiber<T> = null

        const sameType = oldFiber && element && oldFiber.type === element.type

        if (sameType) {
            newFiber = {
                type: oldFiber.type,
                props: element.props,
                dom: oldFiber.dom,
                parent: wipFiber,
                alternate: oldFiber,
                effectTag: 'UPDATE',
                _ref: null,
            }
        }
        if (element && !sameType) {
            newFiber = {
                type: element.type,
                props: element.props,
                parent: wipFiber,
                dom: null,
                alternate: null,
                effectTag: 'PLACEMENT',
                _ref: null,
            }
        }
        if (oldFiber && !sameType) {
            oldFiber.effectTag = 'DELETION'
            RenderState.pushFiberToDeletions(oldFiber)
        }
        if (oldFiber) {
            oldFiber = oldFiber.sibling
        }

        if (index === 0) {
            wipFiber.child = newFiber
        } else if (element) {
            prevSibling.sibling = newFiber
        }

        prevSibling = newFiber
        index++
    }
}

function updateFunctionComponent<T extends Record<string, unknown>>(
    fiber: Fiber<T>,
) {
    if (!isFunctionComponent(fiber.type)) return

    fiber.hooks = []
    RenderState.setWipFiber(fiber)
    HookDispatcher.resetHooks()
    const children = [fiber.type(fiber.props)] as unknown as Fiber<
        Record<string, unknown>
    >[]
    reconcileChildren(fiber, children)
}

function updateHostComponent<T extends Record<string, unknown>>(
    fiber: Fiber<T>,
) {
    if (!fiber.dom) {
        fiber.dom = createDOM(fiber)
    }
    reconcileChildren(
        fiber,
        (fiber.props.children as unknown as Fiber<T>[]) ?? [],
    )
}

function isFunctionComponent<T extends Record<string, unknown>>(
    type: ElementTypes<T>,
): type is ElementFn<T> {
    return type instanceof Function
}

function performUnitOfWork<T extends Record<string, unknown>>(fiber: Fiber<T>) {
    if (isFunctionComponent(fiber.type)) {
        updateFunctionComponent(fiber)
    } else {
        updateHostComponent(fiber)
    }

    if (fiber.child) {
        return fiber.child
    }

    let nextFiber = fiber
    while (nextFiber) {
        if (nextFiber.sibling) {
            return nextFiber.sibling
        }
        nextFiber = nextFiber.parent
    }
}
