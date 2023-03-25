import {
  test,
  it,
  expect,
  beforeAll,
  afterAll,
  beforeEach,
  afterEach,
  describe,
} from "./dist/core.js";

beforeAll(() => {
  console.log("before all");
});

beforeEach(() => {
  console.log("before each");
});

test("first test code", () => {
  console.log("first test case");
  expect(2).toBe(2);
});

// test.only("only test case", () => {
//   console.log("only test case");
// });

it("second test code", () => {
  console.log("second test case");
  expect(2).toBe(3);
});

afterEach(() => {
  console.log("after each");
});

afterAll(() => {
  console.log("after all");
});

describe("sub", () => {
  test("sub:first test case", () => {
    expect(2).toBe(2);
  });
});
