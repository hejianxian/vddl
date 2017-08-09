import path from 'path';
import fs from 'fs';

export const pack = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'package.json'), 'utf8'));

export default {
  compileTemplate: false,
};
