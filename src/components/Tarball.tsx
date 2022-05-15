import { FC, useMemo } from "react";
import { inflate } from "pako";
import untar from "js-untar";
import { useAsync } from "../util/useAsync";
import { Link, useLocation } from "react-router-dom";
import { Directory, pathsToHeirachy } from "../util/path";

interface Props {
  src: string;
}

export const Tarball: FC<Props> = ({ src }) => {
  const files = useTarball(src);

  const { hash } = useLocation();

  const file = useMemo(
    () => files?.find((f) => f.name === hash.slice(1)),
    [hash, files]
  );

  // const [picked, setPicked] = useState("");

  return (
    <section className="viewer2">
      <FileList files={files || []} />
      {file && <FileContent file={file} />}
    </section>
  );
};

const FileNav: FC<{ dir: Directory }> = ({ dir }) => {
  return (
    <nav>
      {Object.entries(dir).map(([name, file]) => {
        if (file === true) {
          return (
            <Link key={name} to={`#${name}TODO`}>
              {name}
            </Link>
          );
        }

        return (
          <div key={name}>
            {name}:
            <FileNav dir={file} />
          </div>
        );
      })}
    </nav>
  );
};

const FileList: FC<{ files: TarFile[] }> = ({ files }) => {
  const dirobj = useMemo(
    () => pathsToHeirachy(files.map((f) => f.name)),
    [files]
  );

  return (
    <nav className="fileList">
      <FileNav dir={dirobj} />
    </nav>
  );
};

const FileContent: FC<{ file: TarFile }> = ({ file }) => {
  const text = useMemo(() => new TextDecoder().decode(file.buffer), [file]);

  return <code>{text}</code>;
};

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
