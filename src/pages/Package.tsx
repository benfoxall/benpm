import {
  FC,
  MouseEventHandler,
  Suspense,
  useEffect,
  useMemo,
  lazy,
} from "react";
import { useLocation, useNavigate, useParams } from "react-router";
import { Link } from "react-router-dom";
import {
  useRecoilValueLoadable,
  useRecoilValue,
  useSetRecoilState,
} from "recoil";
import {
  contentSelector,
  fileAtom,
  filesSelector,
  identifierSelector,
  useStateFromParams,
  versionAtom,
  versionLatestSelector,
  versionsSelector,
} from "../state";
import { Boundary } from "../util/Boundary";
import { Directory } from "../util/path";
import styles from "./Package.module.css";

const CodeFormat = lazy(() => import("../components/CodeFormat"));

const onMouseDown: MouseEventHandler = (e) => {
  if (e.detail > 1) e.preventDefault();
};

export const Package = () => {
  const params = useParams();
  useStateFromParams(params);

  return (
    <Boundary>
      <div className={styles.container}>
        <Boundary>
          <Header />
        </Boundary>

        <Boundary>
          <FileList />
        </Boundary>

        <Boundary>
          <FileContent />
        </Boundary>
      </div>
    </Boundary>
  );
};

const Header = () => {
  const identifier = useRecoilValue(identifierSelector);
  const version = useRecoilValue(versionAtom);

  const latest = useRecoilValueLoadable(versionLatestSelector).valueMaybe();
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
  const { hash } = useLocation();

  return (
    <nav>
      {entries.map(([name, content]) => {
        if (content === true) {
          const target = `#${base}${name}`;

          return (
            <Link
              key={name}
              to={target}
              className={target === hash ? styles.active : ""}
            >
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

  const code = content.valueMaybe() || "";

  return (
    <main className={styles.content}>
      <pre>
        <code>
          <Suspense fallback={<>{code}</>}>
            <CodeFormat>{code}</CodeFormat>
          </Suspense>
        </code>
      </pre>
    </main>
  );
};
