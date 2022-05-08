import { suite, test } from "mocha";
import { assert, expect } from "chai";

import { parsePackage } from "./path";

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
