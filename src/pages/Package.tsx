import { FC, MouseEventHandler, useEffect, useMemo } from "react";
import { Navigate, useLocation, useNavigate, useParams } from "react-router";
import { Link } from "react-router-dom";
import {
  useRecoilValue,
  useRecoilValueLoadable,
  useSetRecoilState,
} from "recoil";
import {
  contentSelector,
  fileAtom,
  filesSelector,
  identifierSelector,
  metaSelector,
  nameAtom,
  packageFiles,
  useStateFromParams,
  versionAtom,
  versionLatest,
  versionsSelector,
} from "../state";
import { Boundary } from "../util/Boundary";
import { Directory } from "../util/path";
import styles from "./Package.module.css";

const onMouseDown: MouseEventHandler = (e) => {
  if (e.detail > 1) e.preventDefault();
};

export const Package = () => {
  const params = useParams();
  useStateFromParams(params);

  return (
    <Boundary>
      <div className={styles.container}>
        <Header />

        <FileList />

        <FileContent />
      </div>
    </Boundary>
  );
};

const Header = () => {
  const identifier = useRecoilValue(identifierSelector);
  const version = useRecoilValue(versionAtom);
  const latest = useRecoilValue(versionLatest);

  const versions = useRecoilValueLoadable(versionsSelector).valueMaybe();

  // replace version in url
  const { hash } = useLocation();
  const navigate = useNavigate();
  const setVersion = (version: string) =>
    navigate(`/package/${identifier}/v/${version}${hash || ""}`);

  // redirect to latest version
  useEffect(() => {
    if (latest && !version) setVersion(latest);
  }, [version, latest]);

  const versionList = versions || (version && [version]) || [];

  return (
    <header className={styles.head}>
      <h1>{identifier || "?"}</h1>

      <select value={version} onChange={(e) => setVersion(e.target.value)}>
        {versionList.map((version) => (
          <option key={version}>{version}</option>
        ))}
      </select>
    </header>
  );
};

const FileList = () => {
  const files = useRecoilValue(filesSelector);

  return (
    <section className={styles.fileList}>
      <RenderFileNav files={files} />
    </section>
  );
};

const RenderFileNav: FC<{ files: Directory; base?: string }> = ({
  files,
  base = "",
}) => {
  const entries = useMemo(() => Object.entries(files), [files]);
  return (
    <nav>
      {entries.map(([name, content]) => {
        if (content === true) {
          return (
            <Link key={name} to={`#${base}${name}`}>
              {name}
            </Link>
          );
        }

        return (
          <details key={name} open>
            <summary onMouseDown={onMouseDown}>{name}</summary>
            <RenderFileNav files={content} base={base + name + "/"} />
          </details>
        );
      })}
    </nav>
  );
};

const FileContent = () => {
  const { hash } = useLocation();

  const setFile = useSetRecoilState(fileAtom);
  useEffect(() => setFile(hash?.slice(1)), [hash]);

  const content = useRecoilValueLoadable(contentSelector);

  return (
    <main className={styles.content}>
      <pre>
        <code>{content.valueMaybe() || ""}</code>
      </pre>
    </main>
  );
};
