import { FC, MouseEventHandler, Suspense, useEffect, lazy } from "react";
import {
  generatePath,
  useLocation,
  useNavigate,
  useParams,
} from "react-router";
import { Link } from "react-router-dom";
import { useRecoilValueLoadable, useRecoilValue } from "recoil";
import {
  useFileFromHash,
  useStateFromParams,
  contentSelector,
  identifierSelector,
  fileAtom,
  filesSelector,
  versionAtom,
  // versionLatestSelector,
  versionListSelector,
} from "../state";
import { Boundary } from "../util/Boundary";
import { FileEntryList } from "../util/path";
import styles from "./Package.module.css";

const CodeFormat = lazy(() => import("../components/CodeFormat"));

const onMouseDown: MouseEventHandler = (e) => {
  if (e.detail > 1) e.preventDefault();
};

export const Package = () => {
  // update state
  const params = useParams();
  useStateFromParams(params);

  const { hash } = useLocation();
  useFileFromHash(hash);

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

  // const latest = useRecoilValueLoadable(versionLatestSelector).valueMaybe();
  const versions = useRecoilValueLoadable(versionListSelector).valueMaybe();

  // replace version in url
  const { hash } = useLocation();
  const navigate = useNavigate();
  // const setVersion = (version: string) =>
  //   navigate(`/package/${identifier}/v/${version}${hash || ""}`);

  // redirect to latest version
  // useEffect(() => {
  //   if (latest && !version) setVersion(latest);
  // }, [version, latest]);

  const versionList = versions || (version && [version]) || [];

  return (
    <header className={styles.head}>
      <h1>{identifier || "?"}</h1>

      <select
        value={version}
        onChange={(e) =>
          navigate(`/package/${identifier}/v/${e.target.value}${hash || ""}`)
        }
      >
        {versionList.map((version) => (
          <option key={version}>{version}</option>
        ))}
      </select>
    </header>
  );
};

const FileList = () => {
  let list = useRecoilValue(filesSelector);

  return (
    <section className={styles.fileList}>
      {list.length === 1 && (
        <RenderFileEntries
          files={list[0][1] as FileEntryList}
          base="package/"
        />
      )}
    </section>
  );
};

const RenderFileEntries: FC<{ files: FileEntryList; base: string }> = ({
  files,
  base,
}) => {
  const file = useRecoilValueLoadable(fileAtom).valueMaybe();

  return (
    <nav>
      {files.map((entry) => {
        if (Array.isArray(entry)) {
          const [dirname, dirFiles] = entry;

          return (
            <details key={dirname}>
              <summary onMouseDown={onMouseDown}>{dirname}</summary>
              <RenderFileEntries files={dirFiles} base={base + dirname + "/"} />
            </details>
          );
        }

        const target = `#${base}${entry}`;
        const h = `#${file}`;

        return (
          <Link
            key={entry}
            to={target}
            className={target === h ? styles.active : ""}
          >
            {entry}
          </Link>
        );
      })}
    </nav>
  );
};

const FileContent = () => {
  const content = useRecoilValueLoadable(contentSelector).valueMaybe();
  const file = useRecoilValueLoadable(fileAtom).valueMaybe() || ".txt";

  const code = content || "";

  return (
    <main className={styles.content}>
      <pre>
        <code>
          <Suspense fallback={<>{code}</>}>
            <CodeFormat filename={file}>{code}</CodeFormat>
          </Suspense>
        </code>
      </pre>
    </main>
  );
};

export default Package;
