import "./chunk-VATFOK7S.js";

// lib/core.ts
var tests = [];
var onlys = [];
var beforeAlls = [];
var beforeEachs = [];
var afterAlls = [];
var afterEachs = [];
var describes = [];
function test(name, callback) {
  tests.push({ name, callback });
}
test.only = (name, callback) => {
  onlys.push({ name, callback });
};
var it = test;
function beforeAll(callback) {
  beforeAlls.push(callback);
}
function beforeEach(callback) {
  beforeEachs.push(callback);
}
function afterEach(callback) {
  afterEachs.push(callback);
}
function afterAll(callback) {
  afterAlls.push(callback);
}
function expect(actual) {
  return {
    toBe(expected) {
      if (expected === actual) {
      } else {
        throw new Error(`fail actual:${actual} expected:${expected}`);
      }
    }
  };
}
function describe(title, callback) {
  describes.push({
    title,
    callback
  });
  callback();
}
function run() {
  for (const beforeAllCallback of beforeAlls) {
    beforeAllCallback();
  }
  const suit = onlys.length > 0 ? onlys : tests;
  for (const test2 of suit) {
    beforeEachs.forEach((beforeEachCallback) => {
      beforeEachCallback();
    });
    try {
      test2.callback();
      console.log(`ok: ${test2.name}`);
    } catch (error) {
      console.log(`fail: ${error}`);
    }
    afterEachs.forEach((afterEachCallback) => {
      afterEachCallback();
    });
  }
  afterAlls.forEach((afterAllCallback) => {
    afterAllCallback();
  });
}
export {
  afterAll,
  afterEach,
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
  run,
  test
};
