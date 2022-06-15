import { useEffect } from "react";
import { atom, selector, useRecoilTransaction_UNSTABLE } from "recoil";
import { pathsToHeirachy } from "./util/path";

import { inflate } from "pako";
import untar from "js-untar";

interface Params {
  name?: string;
  scope?: string;
  version?: string;
}

// sync state from url pattern
export function useStateFromParams({ scope, name, version }: Params) {
  const change = useRecoilTransaction_UNSTABLE(
    ({ set }) =>
      () => {
        set(scopeAtom, scope);
        set(nameAtom, name);
        set(versionAtom, version);
      },
    [name, scope, version]
  );

  useEffect(change, [name, scope, version]);
}

export function useFileFromHash(hash?: string) {
  const change = useRecoilTransaction_UNSTABLE(
    ({ set }) =>
      () =>
        set(fileAtom, hash?.slice(1)),
    [hash]
  );

  useEffect(change, [hash]);
}

export const scopeAtom = atom<string | undefined>({
  key: "scope",
});
export const nameAtom = atom<string | undefined>({
  key: "name",
});
export const versionAtom = atom<string | undefined>({
  key: "version",
});

export const fileAtom = atom<string | undefined>({
  key: "file",
  default: undefined,
});

export const identifierSelector = selector({
  key: "identifier",
  get({ get }) {
    const scope = get(scopeAtom);
    const name = get(nameAtom);

    if (scope && name) return `@${scope}/${name}`;

    return name;
  },
});

// ---- versions

const metaSelector = selector({
  key: "meta",
  async get({ get }) {
    const name = get(identifierSelector);

    if (name) {
      const res = await fetch(`https://registry.npmjs.org/${name}`);
      return res.json();
    }

    return null;
  },
});

export const versionListSelector = selector({
  key: "version-list",
  get({ get }) {
    const meta = get(metaSelector);
    const { modified, created, ...rest }: Record<string, string> =
      meta?.time || {};

    // order versions by timing
    const versions = Object.entries(rest)
      .sort(([, a], [, b]) => new Date(b).getTime() - new Date(a).getTime())
      .map(([version]) => version);

    return versions;
  },
});

export const actualVersionSelector = selector({
  key: "version-actual",
  get({ get }) {
    return get(versionAtom) || get(metaSelector)?.["dist-tags"].latest;
  },
});

const packageFiles = selector<TarFile[]>({
  key: "package-contents",
  async get({ get }) {
    const meta = get(metaSelector);
    const v = get(actualVersionSelector);

    if (!v) return [];

    try {
      const tarball = meta.versions[v].dist.tarball;

      const res = await fetch(tarball);

      const buf = await res.arrayBuffer();
      const cont = inflate(new Uint8Array(buf));
      return untar(cont.buffer);
    } catch (e) {
      console.error(e);
    }
    return [];
  },
});

export const filesSelector = selector({
  key: "files-dev",
  get({ get }) {
    const files = get(packageFiles);
    const paths = files.map((file) => file.name);

    return pathsToHeirachy(paths);
  },
});

export const contentSelector = selector({
  key: "content",
  get({ get }) {
    const files = get(packageFiles);
    const file = get(fileAtom);

    for (const f of files) {
      if (file === f.name) {
        return new TextDecoder().decode(f.buffer);
      }
    }

    return null;
  },
});
