interface PackageDetails {
  name: string | undefined;
  version: string | undefined;
  file: string | undefined;
}

export function parsePackage(path: string): PackageDetails {
  const [pkg, ...fileparts] = path.split("~");
  const [name, version] = pkg.split("/v/");

  const file = fileparts.length > 0 ? fileparts.join("~") : undefined;

  return { name, version, file };
}

export interface Directory {
  [name: string]: true | Directory;
}

export function pathsToHeirachy(paths: string[]): Directory {
  const dir: Directory = {};

  const groups: Record<string, string[]> = {};

  for (const path of paths) {
    const [dirname, ...rest] = path.split("/");
    if (rest.length === 0) dir[dirname] = true;
    else (groups[dirname] ||= []).push(rest.join("/"));
  }

  for (const [dirname, paths] of Object.entries(groups)) {
    dir[dirname] = pathsToHeirachy(paths);
  }

  return dir;
}
