import { useEffect } from "react";
import { atom, selector, useRecoilTransaction_UNSTABLE } from "recoil";
import { parsePackage } from "./util/path";

// sync state from url pattern
export function useStateFromPath(path?: string) {
  const change = useRecoilTransaction_UNSTABLE(
    ({ set }) =>
      () => {
        const { name, version, file } = parsePackage(path || "");

        set(nameAtom, name);
        set(versionAtom, version);
        set(fileAtom, file);
      },
    [path]
  );

  useEffect(() => change(), [path]);
}

export const nameAtom = atom<string | undefined>({
  key: "name",
  default: undefined,
});
export const versionAtom = atom<string | undefined>({
  key: "version",
  default: undefined,
});
export const fileAtom = atom<string | undefined>({
  key: "file",
  default: undefined,
});

export const metaSelector = selector({
  key: "meta",
  async get({ get }) {
    const name = get(nameAtom);

    if (name) {
      const res = await fetch(`https://registry.npmjs.org/${name}`);
      return res.json();
    }

    return null;
  },
});

export const versionsSelector = selector({
  key: "versions",
  get({ get }) {
    const meta = get(metaSelector);

    try {
      return Object.keys(meta.versions);
    } catch {
      return [];
    }
  },
});

export const packageName = "@foo/thing";
export const versions = ["0.0.1", "0.0.2", "0.2.1", "0.3.3"];

export const files = ["foo.txt", "bar.js"];
export const content = "const blah = 1234;";

export const version = "0.0.2";
export const file = "bar.js";
