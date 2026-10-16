import tsup from "tsup";

export default tsup.defineConfig({
    entry: ["src/index.ts", "example/worker.ts", "example/index.ts"],
    dts: true,
    noExternal: [/(.*)/]
});
