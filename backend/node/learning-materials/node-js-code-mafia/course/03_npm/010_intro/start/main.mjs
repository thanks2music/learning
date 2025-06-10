import cloneDeep from 'lodash/cloneDeep.js';
const original = { prop: { nested: 'value' } };
// オブジェクトの複製
const cloned = cloneDeep(original);

cloned.prop.nested = 'another new value';

console.log(original, cloned);
