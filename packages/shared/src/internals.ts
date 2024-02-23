interface Internals {
    currentlyRenderingHook: any
    workInProgressHook: any
    hookIndex: number
    workInProgressFiber: any
}

export const Internals: Internals = {
    currentlyRenderingHook: null,
    workInProgressHook: null,
    hookIndex: null,
    workInProgressFiber: null,
}
