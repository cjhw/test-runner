declare function test(name: string, callback: () => void): void;
declare namespace test {
    var only: (name: string, callback: () => void) => void;
}
declare const it: typeof test;
declare function beforeAll(callback: () => void): void;
declare function beforeEach(callback: () => void): void;
declare function afterEach(callback: () => void): void;
declare function afterAll(callback: () => void): void;
declare function expect<T>(actual: T): {
    toBe(expected: T): void;
};
declare function describe(title: string, callback: () => void): void;
declare function run(): void;

export { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it, run, test };
