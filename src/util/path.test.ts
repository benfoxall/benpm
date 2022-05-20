import { suite, test } from "mocha";
import { assert } from "chai";

import { pathsToHeirachy } from "./path";

suite("pathsToHeirachy", () => {
  test("empty list", () => {
    const result = pathsToHeirachy([]);

    assert.deepEqual(result, []);
  });
  test("single file", () => {
    const result = pathsToHeirachy(["file.txt"]);

    assert.deepEqual(result, ["file.txt"]);
  });

  test("multi files", () => {
    const result = pathsToHeirachy(["a.txt", "b.txt"]);

    assert.deepEqual(result, ["a.txt", "b.txt"]);
  });

  test("hierarchy one dir", () => {
    const result = pathsToHeirachy(["dir/a.txt", "dir/b.txt"]);

    assert.deepEqual(result, [["dir", ["a.txt", "b.txt"]]]);
  });

  test("hierarchy multi", () => {
    const result = pathsToHeirachy(["dir/a.txt", "dir/b.txt", "top.txt"]);

    assert.deepEqual(result, [["dir", ["a.txt", "b.txt"]], "top.txt"]);
  });

  test("hierarchy sorted", () => {
    const result = pathsToHeirachy(["aa/a", "aa/b", "a", "bb/a", "bb/b", "b"]);

    assert.deepEqual(result, [
      ["aa", ["a", "b"]],
      ["bb", ["a", "b"]],
      "a",
      "b",
    ]);
  });
});
