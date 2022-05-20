export type FileEntryList = (string | [string, FileEntryList])[];

export function pathsToHeirachy(paths: string[]): FileEntryList {
  const list: FileEntryList = [];

  const groups: Record<string, string[]> = {};

  for (const path of paths) {
    const [dirname, ...rest] = path.split("/");
    if (rest.length === 0) list.push(dirname);
    else (groups[dirname] ||= []).push(rest.join("/"));
  }

  for (const [dirname, paths] of Object.entries(groups)) {
    list.push([dirname, pathsToHeirachy(paths)]);
  }

  return sort(list);
}

function sort(list: FileEntryList): FileEntryList {
  list.sort((a, b) => {
    const na = Array.isArray(a) ? a[0] : a;
    const nb = Array.isArray(b) ? b[0] : b;

    if (Array.isArray(a) && !Array.isArray(b)) {
      return -1;
    }
    if (Array.isArray(b) && !Array.isArray(a)) {
      return 1;
    }

    return na.localeCompare(nb);
  });

  return list;
}
