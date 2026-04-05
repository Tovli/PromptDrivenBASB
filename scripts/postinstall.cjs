const path = require('node:path');

const { scaffoldWorkspace } = require('./lib/scaffold-workspace.cjs');

const packageRoot = path.resolve(__dirname, '..');
const targetRoot = process.env.INIT_CWD
  ? path.resolve(process.env.INIT_CWD)
  : process.cwd();

scaffoldWorkspace({
  packageRoot,
  targetRoot,
});
