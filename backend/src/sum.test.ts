import { expect, test } from "vitest";
import { sum } from "./sum.js";

test("passing test", () => {
  expect(sum(1, 2)).toBe(3);
});

test("failing test", () => {
  expect(sum(2, 2)).toBe(4);
});
