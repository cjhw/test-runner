import glob from "glob";
import fs from "fs/promises";
import { build } from "esbuild";
import path from "path";
import { normalizePath } from "./utils";

const files = glob.sync("*.spec.js");
const root = normalizePath(path.resolve(__dirname));

files.forEach(async (file) => {
  const fileContent = await fs.readFile(file, "utf-8");
  await runModule(fileContent + `import { run } from '${root}/core.js'; run()`);
});

async function runModule(fileContent: string) {
  try {
    const result = await build({
      platform: "node",
      stdin: {
        contents: fileContent,
        resolveDir: process.cwd(),
      },
      format: "esm",
      write: false,
      bundle: true,
      target: "esnext",
    });

    // 获取转换后的代码
    const transformedCode = result.outputFiles[0].text;
    // 执行代码
    const runCode = new Function(transformedCode);
    debugger;
    runCode();
  } catch (error) {
    console.error("Error executing module:", error);
  }
}
