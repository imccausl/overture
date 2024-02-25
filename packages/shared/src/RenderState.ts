import type { Fiber } from '@overture/renderer'

let nextUnitOfWork: Fiber<Record<string, unknown>> | null = null
let wipRoot: Fiber<Record<string, unknown>> | null = null
let deletions: Fiber<Record<string, unknown>>[] | null = null
let currentRoot: Fiber<Record<string, unknown>> | null = null
let wipFiber: Fiber<Record<string, unknown>> | null = null

const setWipFiber = <T extends Record<string, unknown>>(fiber: Fiber<T>) => {
    wipFiber = fiber
    wipFiber.hooks = []
}

const getWipFiber = () => {
    return wipFiber
}

const setNextUnitOfWork = <T extends Record<string, unknown>>(
    fiber: Fiber<T>,
) => {
    nextUnitOfWork = fiber
}

const setWipRoot = <T extends Record<string, unknown>>(fiber: Fiber<T>) => {
    wipRoot = fiber
}

const pushFiberToDeletions = <T extends Record<string, unknown>>(
    fiber: Fiber<T>,
) => {
    deletions.push(fiber)
}

const setCurrentRoot = <T extends Record<string, unknown>>(fiber: Fiber<T>) => {
    currentRoot = fiber
}

const getNextUnitOfWork = () => {
    return nextUnitOfWork
}

const getWipRoot = () => {
    return wipRoot
}

const getDeletions = () => {
    return deletions
}

const getCurrentRoot = () => {
    return currentRoot
}

const resetDeletions = () => {
    deletions = []
}

const RenderState = {
    setNextUnitOfWork,
    setWipRoot,
    pushFiberToDeletions,
    setCurrentRoot,
    getNextUnitOfWork,
    getWipRoot,
    getDeletions,
    getCurrentRoot,
    resetDeletions,
    setWipFiber,
    getWipFiber,
}

export { RenderState }
