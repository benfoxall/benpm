import { useEffect } from "react";
import { atom, useSetAtom } from "jotai";
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
  const setScope = useSetAtom(scopeAtom);
  const setName = useSetAtom(nameAtom);
  const setVersion = useSetAtom(versionAtom);

  useEffect(() => {
    setScope(scope);
    setName(name);
    setVersion(version);
  }, [name, scope, version, setScope, setName, setVersion]);
}

export function useFileFromHash(hash?: string) {
  const setFile = useSetAtom(fileAtom);

  useEffect(() => {
    setFile(hash?.slice(1));
  }, [hash, setFile]);
}

export const scopeAtom = atom<string | undefined>(undefined);
export const nameAtom = atom<string | undefined>(undefined);
export const versionAtom = atom<string | undefined>(undefined);

export const fileAtom = atom<string | undefined>(undefined);

export const identifierSelector = atom((get) => {
  const scope = get(scopeAtom);
  const name = get(nameAtom);

  if (scope && name) return `@${scope}/${name}`;

  return name;
});

// ---- versions

const metaSelector = atom(async (get) => {
  const name = get(identifierSelector);

  if (name) {
    const res = await fetch(`https://registry.npmjs.org/${name}`);
    if (!res.ok) {
      throw new Error(`Failed to fetch package meta for ${name}`);
    }
    return res.json();
  }

  return null;
});

export const versionListSelector = atom(async (get) => {
  const meta = await get(metaSelector);
  if (!meta) return [];
  const { modified, created, ...rest }: Record<string, string> =
    meta?.time || {};

  // order versions by timing
  const versions = Object.entries(rest)
    .sort(([, a], [, b]) => new Date(b).getTime() - new Date(a).getTime())
    .map(([version]) => version);

  return versions;
});

export const actualVersionSelector = atom(async (get) => {
  const meta = await get(metaSelector);
  if (!meta) return undefined;
  return get(versionAtom) || meta?.["dist-tags"].latest;
});

const packageFiles = atom(async (get) => {
  const meta = await get(metaSelector);
  const v = await get(actualVersionSelector);

  if (!v || !meta) return [];

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
});

export const filesSelector = atom(async (get) => {
  const files = await get(packageFiles);
  const paths = files.map((file: any) => file.name);

  return pathsToHeirachy(paths);
});

export const contentSelector = atom(async (get) => {
  const files = await get(packageFiles);
  const file = get(fileAtom);

  for (const f of files) {
    if (file === f.name) {
      return new TextDecoder().decode(f.buffer);
    }
  }

  return null;
});

interface TarFile {
  name: string;
  buffer: ArrayBuffer;
}