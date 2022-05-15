/// <reference types="vite/client" />

declare module "js-untar";

interface TarFile {
  buffer?: ArrayBuffer;
  checksum: number;
  devmajor: number;
  devminor: number;
  gid: NaN;
  gname: string;
  linkname: string;
  mode: string;
  mtime: number;
  name: string;
  namePrefix: string;
  size: number;
  type: string;
  uid: NaN;
  uname: string;
  ustarFormat: string;
  version: string;
}
