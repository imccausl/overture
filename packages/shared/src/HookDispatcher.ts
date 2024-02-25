import { RenderState } from './RenderState.js'

let hookIndex = 0

const resetHooks = () => {
    hookIndex = 0
}

const useState = <StateType>(
    initialState: StateType | ((state: StateType) => StateType),
) => {
    const oldHook = RenderState.getWipFiber().alternate?.hooks?.[hookIndex]
    const hook: {
        state: StateType
        queue: (StateType | ((state: StateType) => StateType))[]
    } = {
        state: oldHook ? oldHook.state : initialState,
        queue: [],
    }
    const actions: StateType[] = oldHook ? oldHook.queue : []
    actions.forEach((action) => {
        if (typeof action === 'function') {
            hook.state = action(hook.state)
        } else {
            hook.state = action
        }
    })

    function setState(newState: StateType | ((state: StateType) => StateType)) {
        hook.queue.push(newState)
        const currentRoot = RenderState.getCurrentRoot()
        RenderState.setWipRoot({
            dom: currentRoot.dom,
            props: currentRoot.props,
            alternate: currentRoot,
            type:
                currentRoot.dom instanceof HTMLElement
                    ? currentRoot.dom.tagName?.toLowerCase()
                    : 'TEXT_ELEMENT',
            _ref: null,
        })
        RenderState.setNextUnitOfWork(RenderState.getWipRoot())
        RenderState.resetDeletions()
    }

    RenderState.getWipFiber().hooks.push(hook)
    hookIndex += 1
    return [hook.state, setState] as const
}

export const HookDispatcher = {
    resetHooks,
    useState,
}
