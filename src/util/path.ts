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
