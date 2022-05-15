import { suite, test } from "mocha";
import { assert, expect } from "chai";

import { parsePackage, pathsToHeirachy } from "./path";

suite("cases", () => {
  suite("plain", () => {
    test("name", () => {
      assert.deepEqual(parsePackage("pkg"), {
        name: "pkg",
        version: undefined,
        file: undefined,
      });
    });
    test("name + version", () => {
      assert.deepEqual(parsePackage("pkg/v/1.2.3"), {
        name: "pkg",
        version: "1.2.3",
        file: undefined,
      });
    });
    test("name + file", () => {
      assert.deepEqual(parsePackage("pkg~readme.md"), {
        name: "pkg",
        version: undefined,
        file: "readme.md",
      });
    });
    test("name + version + file", () => {
      assert.deepEqual(parsePackage("pkg/v/1.2.3~readme.md"), {
        name: "pkg",
        version: "1.2.3",
        file: "readme.md",
      });
    });
  });

  suite("namespaced", () => {
    test("name", () => {
      assert.deepEqual(parsePackage("@scope/pkg"), {
        name: "@scope/pkg",
        version: undefined,
        file: undefined,
      });
    });
    test("name + version", () => {
      assert.deepEqual(parsePackage("@scope/pkg/v/1.2.3"), {
        name: "@scope/pkg",
        version: "1.2.3",
        file: undefined,
      });
    });
    test("name + file", () => {
      assert.deepEqual(parsePackage("@scope/pkg~readme.md"), {
        name: "@scope/pkg",
        version: undefined,
        file: "readme.md",
      });
    });
    test("name + version + file", () => {
      assert.deepEqual(parsePackage("@scope/pkg/v/1.2.3~readme.md"), {
        name: "@scope/pkg",
        version: "1.2.3",
        file: "readme.md",
      });
    });
  });

  suite("edges", () => {
    test("tilda file", () => {
      assert.equal(parsePackage("pkg~file~name.ext").file, "file~name.ext");
    });
  });
});

suite.only("pathsToHeirachy", () => {
  test("empty list", () => {
    const result = pathsToHeirachy([]);

    assert.deepEqual(result, {});
  });
  test("single file", () => {
    const result = pathsToHeirachy(["file.txt"]);

    assert.deepEqual(result, { "file.txt": true });
  });

  test("multi files", () => {
    const result = pathsToHeirachy(["a.txt", "b.txt"]);

    assert.deepEqual(result, { "a.txt": true, "b.txt": true });
  });

  test("heirachy", () => {
    const result = pathsToHeirachy(["dir/a.txt", "dir/b.txt"]);

    assert.deepEqual(result, { dir: { "a.txt": true, "b.txt": true } });
  });

  test("heirachy", () => {
    const result = pathsToHeirachy(["dir/a.txt", "dir/b.txt", "top.txt"]);

    assert.deepEqual(result, {
      "top.txt": true,
      dir: { "a.txt": true, "b.txt": true },
    });
  });
});
