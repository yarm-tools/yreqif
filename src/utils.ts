// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function ToArray(obj:unknown) {
    if(Array.isArray(obj)) {
        return obj;
    } else {
        return [obj]
    }
}

export function toJSON(obj: object) {
    return JSON.stringify(obj, null, 4)
}