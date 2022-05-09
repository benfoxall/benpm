import {
  contentAtom,
  fileAtom,
  fileListSelector,
  metaSelector,
  nameAtom,
  useStateFromPath,
  versionAtom,
  versionsSelector,
} from "../state";
import { Navigate, NavLink, useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { Boundary } from "../util/Boundary";

export const PackagePage = () => {
  const { "*": path } = useParams();

  useStateFromPath(path);

  const name = useRecoilValue(nameAtom);
  const version = useRecoilValue(versionAtom);

  return (
    <>
      <h3>
        {name}
        <small> {version || ""}</small>
      </h3>

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
  const file = useRecoilValue(fileAtom);
  const meta = useRecoilValue(metaSelector);
  const latest = meta["dist-tags"]?.latest;

  return (
    <nav className="fileList">
      {version === undefined && latest && (
        <Navigate
          to={`/package/${name}/v/${latest}~package/package.json`}
          replace={true}
        />
      )}

      {versions.map((v) => (
        <NavLink
          key={v}
          to={`/package/${name}/v/${v}${file ? `~${file}` : ""}`}
          className={v === version ? "selected" : ""}
        >
          {v}
        </NavLink>
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
        <NavLink key={f} to={`/package/${name}/v/${version}~${f}`}>
          {f}
        </NavLink>
      ))}
    </nav>
  );
};

const FileContent = () => {
  const content = useRecoilValue(contentAtom);

  return <code>{content}</code>;
};
