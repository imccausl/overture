export function invariant(condition: any, message?: string): void {
    if (!condition) {
        throw new Error(message || 'Invariant Violation')
    }
}
