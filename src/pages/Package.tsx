import {
  contentAtom,
  file,
  fileListSelector,
  files,
  metaSelector,
  nameAtom,
  useStateFromPath,
  versionAtom,
  versionsSelector,
} from "../state";
import Highlight from "react-syntax-highlighter";
import { Link, useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { Boundary } from "../util/Boundary";

export const PackagePage = () => {
  const { "*": path } = useParams();

  useStateFromPath(path);

  const name = useRecoilValue(nameAtom);
  const version = useRecoilValue(versionAtom);

  return (
    <>
      <h1>
        {name}
        <small> {version || ""}</small>
      </h1>

      <section className="viewer">
        <section>
          <Boundary>
            <Versions />
          </Boundary>
        </section>
        <section>
          <Boundary>
            <FileList />
          </Boundary>
        </section>
        <section>
          <Boundary>
            <FileContent />
          </Boundary>
        </section>
      </section>
    </>
  );
};

const Versions = () => {
  const name = useRecoilValue(nameAtom);
  const version = useRecoilValue(versionAtom);
  const versions = useRecoilValue(versionsSelector);

  return (
    <nav className="fileList">
      {versions.map((v) => (
        <Link
          key={v}
          to={`/package/${name}/v/${v}`}
          className={v === version ? "selected" : ""}
        >
          {v}
        </Link>
      ))}
    </nav>
  );
};

const FileList = () => {
  const name = useRecoilValue(nameAtom);
  const version = useRecoilValue(versionAtom);

  const files = useRecoilValue(fileListSelector);

  return (
    <nav className="fileList">
      {files.map((f) => (
        <Link key={f} to={`/package/${name}/v/${version}~${f}`}>
          {f}
        </Link>
      ))}
    </nav>
  );
};

const FileContent = () => {
  const content = useRecoilValue(contentAtom);

  return <Highlight>{content}</Highlight>;
};
