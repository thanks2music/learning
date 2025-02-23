import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// or

const __dirname2 = fileURLToPath(new URL('.', import.meta.url));

// console.log(__filename);
// console.log(__dirname);
// console.log(__dirname2);
// console.log(new URL('.', import.meta.url));

// 1 createRequire の使用
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const jsonObj = require('./sample.json');

// 2 (Node 19 Experimental)
import jsonObj2 from './sample.json' assert { type: 'json' };

// console.log(jsonObj);
console.log(jsonObj2);
