import { useEffect } from "react";
import { atom, selector, useRecoilTransaction_UNSTABLE } from "recoil";
import { parsePackage, pathsToHeirachy } from "./util/path";

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

  useEffect(() => change(), [name, scope, version]);
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

export const metaSelector = selector({
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

export const versionsSelector = selector({
  key: "versions",
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

export const versionLatest = selector({
  key: "version-latest",
  get({ get }) {
    return get(metaSelector)?.["dist-tags"].latest;
  },
});

export const packageFiles = selector<TarFile[]>({
  key: "package-contents",
  async get({ get }) {
    const meta = get(metaSelector);
    const v = get(versionAtom);

    try {
      const tarball = meta.versions[v!].dist.tarball;

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
    // console.log("GO", files, file);
    // return "n";

    let first = files.find((file) => file.type === "0");

    console.log(first);

    for (const f of files) {
      if (file === f.name) {
        return new TextDecoder().decode(f.buffer);
      }
    }

    // const paths = files.map((file) => file.name);

    return "Hello world";
  },
});

/*


----



*/

// sync state from url pattern
/** @deprecated */
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

// export const fileAtom = atom<string | undefined>({
//   key: "file",
//   default: undefined,
// });

// export const metaSelector = selector({
//   key: "meta",
//   async get({ get }) {
//     const name = get(nameAtom);

//     if (name) {
//       const res = await fetch(`https://registry.npmjs.org/${name}`);
//       return res.json();
//     }

//     return null;
//   },
// });

// export const versionsSelector = selector({
//   key: "version-list",
//   get({ get }) {
//     const meta = get(metaSelector);

//     // console.log("META", meta);
//     // window.meta = meta;

//     try {
//       return Object.keys(meta.versions);
//     } catch {
//       return [];
//     }
//   },
// });

// export const packageContents = selector({
//   key: "package-contents",
//   async get({ get }) {
//     const meta = get(metaSelector);
//     const v = get(versionAtom);

//     try {
//       const tarball = meta.versions[v!].dist.tarball;

//       const res = await fetch(tarball);

//       const buf = await res.arrayBuffer();
//       const cont = inflate(new Uint8Array(buf));
//       const files = await untar(cont.buffer);

//       // console.log("files", files);
//       // window.files = files;

//       return files;
//     } catch (e) {
//       console.error(e);
//     }
//     return [];
//   },
// });

export const fileListSelector = selector<string[]>({
  key: "file-list",
  get({ get }) {
    const contents = get(packageFiles);

    return contents
      .filter((file: any) => file.type === "0") // files only
      .map((file: any) => file.name);
  },
});

export const contentAtom = selector<string>({
  key: "file-content",
  get({ get }) {
    const content = get(packageFiles);
    const file = get(fileAtom);

    for (const f of content) {
      if (f.name === file) {
        return new TextDecoder().decode(f.buffer);
      }
    }

    return "";
  },
});
