import tsup from "tsup";

export default tsup.defineConfig({
    entry: ["src/index.ts"],
    dts: true
});
