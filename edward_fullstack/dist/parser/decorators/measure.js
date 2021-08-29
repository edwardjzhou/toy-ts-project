"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.measure = void 0;
// from https://blog.logrocket.com/a-practical-guide-to-typescript-decorators/
const perf_hooks_1 = require("perf_hooks");
const measure = (target, propertyKey, descriptor) => {
  const originalMethod = descriptor.value;
  descriptor.value = function (...args) {
    const start = perf_hooks_1.performance.now();
    const result = originalMethod.apply(this, args);
    const finish = perf_hooks_1.performance.now();
    // console.log(`Execution time: ${finish - start} milliseconds`);
    return result;
  };
  return descriptor;
};
exports.measure = measure;
exports.default = exports.measure;
