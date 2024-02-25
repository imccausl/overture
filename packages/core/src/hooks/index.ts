import { HookDispatcher } from 'shared'

type UseStateArg<T> = T | ((prevState: T) => T)
type UseStateReturnValue<S> = Readonly<
    [S, (newState: S | ((state: S) => S)) => void]
>

export const useState = <S>(
    initialState: UseStateArg<S>,
): UseStateReturnValue<S> => {
    return HookDispatcher.useState(initialState)
}
