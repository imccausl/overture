export const UpdateTypes = {
    DELETE: 'DELETE',
    UPDATE: 'UPDATE',
    CREATE: 'CREATE',
} as const

export type UpdateTypes = (typeof UpdateTypes)[keyof typeof UpdateTypes]
