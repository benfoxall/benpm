import {
  content,
  file,
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
          <nav className="fileList">
            {files.map((v) => (
              <a key={v} className={v === file ? "selected" : ""}>
                {v}
              </a>
            ))}
          </nav>
        </section>
        <section>
          <Highlight>{content}</Highlight>
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
