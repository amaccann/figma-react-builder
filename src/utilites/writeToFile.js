import fs from 'fs';
import path from 'path';

import { init } from 'ramda';

const getPath = (env) => path.resolve(process.cwd(), env);

export default (filePath = '', data = '') => {
  const path = filePath.split('/');
  const fullPath = getPath(filePath);
  const pathToDir = init(fullPath.split('/')).join('/');

  if (!fs.existsSync(pathToDir)){
    fs.mkdirSync(pathToDir, { recursive: true });
  }

  fs.writeFileSync(fullPath, data);
};