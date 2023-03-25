import {
  __dirname
} from "./chunk-VATFOK7S.js";

// lib/index.ts
import glob from "glob";
import fs from "fs/promises";
import { build } from "esbuild";
import path2 from "path";

// lib/utils.ts
import path from "path";
import os from "os";
function slash(p) {
  return p.replace(/\\/g, "/");
}
var isWindows = os.platform() === "win32";
function normalizePath(id) {
  return path.posix.normalize(isWindows ? slash(id) : id);
}

// lib/index.ts
var files = glob.sync("*.spec.js");
var root = normalizePath(path2.resolve(__dirname));
files.forEach(async (file) => {
  const fileContent = await fs.readFile(file, "utf-8");
  await runModule(fileContent + `import { run } from '${root}/core.js'; run()`);
});
async function runModule(fileContent) {
  try {
    const result = await build({
      platform: "node",
      stdin: {
        contents: fileContent,
        resolveDir: process.cwd()
      },
      format: "esm",
      write: false,
      bundle: true,
      target: "esnext"
    });
    const transformedCode = result.outputFiles[0].text;
    const runCode = new Function(transformedCode);
    debugger;
    runCode();
  } catch (error) {
    console.error("Error executing module:", error);
  }
}
