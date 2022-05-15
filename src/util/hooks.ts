import { DependencyList, FC, useEffect, useState } from "react";
import { inflate } from "pako";
import { useAsync } from "./useAsync";
import untar from "js-untar";

export const useTarball = (src: string) =>
  useAsync<TarFile[]>(
    async ({ signal }) => {
      const res = await fetch(src, { signal });

      const buf = await res.arrayBuffer();
      const cont = inflate(new Uint8Array(buf));

      return untar(cont.buffer);
    },
    [src]
  );

export const useMeta = (packageName: string) =>
  useAsync<any>(
    async ({ signal }) => {
      const res = await fetch(`https://registry.npmjs.org/${packageName}`, {
        signal,
      });

      return res.json();
    },
    [packageName]
  );

export const useFiles = (src: string) =>
  useAsync<TarFile[]>(
    async ({ signal }) => {
      const res = await fetch(src, { signal });

      const buf = await res.arrayBuffer();
      const cont = inflate(new Uint8Array(buf));

      return untar(cont.buffer);
    },
    [src]
  );
