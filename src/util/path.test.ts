import { describe, test, expect } from "vitest";

import { pathsToHeirachy } from "./path";

describe("pathsToHeirachy", () => {
  test("empty list", () => {
    const result = pathsToHeirachy([]);

    expect(result).toEqual([]);
  });
  test("single file", () => {
    const result = pathsToHeirachy(["file.txt"]);

    expect(result).toEqual(["file.txt"]);
  });

  test("multi files", () => {
    const result = pathsToHeirachy(["a.txt", "b.txt"]);

    expect(result).toEqual(["a.txt", "b.txt"]);
  });

  test("hierarchy one dir", () => {
    const result = pathsToHeirachy(["dir/a.txt", "dir/b.txt"]);

    expect(result).toEqual([["dir", ["a.txt", "b.txt"]]]);
  });

  test("hierarchy multi", () => {
    const result = pathsToHeirachy(["dir/a.txt", "dir/b.txt", "top.txt"]);

    expect(result).toEqual([["dir", ["a.txt", "b.txt"]], "top.txt"]);
  });

  test("hierarchy sorted", () => {
    const result = pathsToHeirachy(["aa/a", "aa/b", "a", "bb/a", "bb/b", "b"]);

    expect(result).toEqual([
      ["aa", ["a", "b"]],
      ["bb", ["a", "b"]],
      "a",
      "b",
    ]);
  });
});