export function toWorkerUrl<C extends Record<string, unknown>>(executor: string | ((arg: C) => void), context: C) {
    let code: string;
    if (typeof executor === "string") {
        code = `const {${Object.keys(context).join(",")}}=${JSON.stringify(context)};\n${executor}`;
    } else {
        code = `(${executor})(${JSON.stringify(context)})`;
    }
    return URL.createObjectURL(new Blob([code]));
}
