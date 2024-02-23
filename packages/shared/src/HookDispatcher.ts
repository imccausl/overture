import { rerender } from '@overture/renderer'

const hooks: any[] = []
let currentHook = 0

export const resetHooks = () => {
    currentHook = 0
}

export const useState = <StateType>(initialState: StateType) => {
    hooks[currentHook] = hooks[currentHook] || initialState
    const setStateHookIndex = currentHook
    const setState = (newState: StateType) => {
        hooks[setStateHookIndex] = newState
        rerender()
    }
    currentHook += 1
    console.log({ hooks })
    return [hooks[setStateHookIndex], setState]
}

export const HookDispatcher = {
    useState,
    resetHooks,
}
