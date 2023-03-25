"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }// lib/index.ts
var _glob = require('glob'); var _glob2 = _interopRequireDefault(_glob);
var _promises = require('fs/promises'); var _promises2 = _interopRequireDefault(_promises);
var _esbuild = require('esbuild');
var _path = require('path'); var _path2 = _interopRequireDefault(_path);

// lib/utils.ts

var _os = require('os'); var _os2 = _interopRequireDefault(_os);
function slash(p) {
  return p.replace(/\\/g, "/");
}
var isWindows = _os2.default.platform() === "win32";
function normalizePath(id) {
  return _path2.default.posix.normalize(isWindows ? slash(id) : id);
}

// lib/index.ts
var files = _glob2.default.sync("*.spec.js");
var root = normalizePath(_path2.default.resolve(__dirname));
files.forEach(async (file) => {
  const fileContent = await _promises2.default.readFile(file, "utf-8");
  await runModule(fileContent + `import { run } from '${root}/core.js'; run()`);
});
async function runModule(fileContent) {
  try {
    const result = await _esbuild.build.call(void 0, {
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
