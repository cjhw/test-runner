import type { Describe, Test } from "./types";

const tests: Test[] = [];
const onlys: Test[] = [];
const beforeAlls: (() => void)[] = [];
const beforeEachs: (() => void)[] = [];
const afterAlls: (() => void)[] = [];
const afterEachs: (() => void)[] = [];
const describes: Describe[] = [];

export function test(name: string, callback: () => void) {
  tests.push({ name, callback });
}

test.only = (name: string, callback: () => void) => {
  onlys.push({ name, callback });
};

export const it = test;

export function beforeAll(callback: () => void) {
  beforeAlls.push(callback);
}

export function beforeEach(callback: () => void) {
  beforeEachs.push(callback);
}

export function afterEach(callback: () => void) {
  afterEachs.push(callback);
}
export function afterAll(callback: () => void) {
  afterAlls.push(callback);
}

export function expect<T>(actual: T) {
  return {
    toBe(expected: T) {
      if (expected === actual) {
      } else {
        throw new Error(`fail actual:${actual} expected:${expected}`);
      }
    },
  };
}

export function describe(title: string, callback: () => void) {
  describes.push({
    title,
    callback,
  });

  callback();
}

export function run() {
  for (const beforeAllCallback of beforeAlls) {
    beforeAllCallback();
  }
  const suit = onlys.length > 0 ? onlys : tests;
  for (const test of suit) {
    beforeEachs.forEach((beforeEachCallback) => {
      beforeEachCallback();
    });
    try {
      test.callback();
      console.log(`ok: ${test.name}`);
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
