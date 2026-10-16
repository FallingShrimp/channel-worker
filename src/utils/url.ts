export function toWorkerUrl<C extends Record<string, unknown>>(executor: (arg: C) => void, context: C) {
    return URL.createObjectURL(new Blob([`(${executor})(${JSON.stringify(context)})`]));
}
