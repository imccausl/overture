type InitialState<S> = S | (() => S)

function useState<S>(initialState: InitialState<S>) {
  const state =
    typeof initialState === 'function'
      ? (initialState as () => S)()
      : initialState

  return [state, () => {}]
}

export const HookDispatcher = {
  useState,
}
