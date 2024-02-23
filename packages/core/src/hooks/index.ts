import { HookDispatcher } from 'shared'

type UseStateArg<T> = T | ((prevState: T) => T)

export const useState = <S>(initialState: UseStateArg<S>) => {
    return HookDispatcher.useState(initialState)
}
