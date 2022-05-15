import { FC, useEffect } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { Tarball } from "../components/Tarball";
import { useMeta } from "../util/hooks";

export const Package2 = () => {
  const { name, scope, version } = useParams();
  const { hash } = useLocation();

  const id = scope ? `@${scope}/${name}` : name;

  //   const url = version && name

  //   console.log("---", meta);

  return (
    <>
      <header style={{ display: "flex", justifyContent: "space-between" }}>
        <h1>{id}</h1>

        {version && <h3>{version}</h3>}

        {id && <VersionPicker id={id} />}
      </header>

      <main>
        {id && version && (
          <Tarball
            src={`https://registry.npmjs.org/${id}/-/${name}-${version}.tgz`}
          />
        )}
      </main>
    </>
  );
};

const VersionPicker: FC<{ id: string }> = ({ id }) => {
  const meta = useMeta(id);
  const navigate = useNavigate();

  const { version } = useParams();
  const { hash } = useLocation();

  const latest = meta?.["dist-tags"].latest;

  useEffect(() => {
    if (latest && !version) {
      navigate(`/package/${id}/v/${latest}${hash || ""}`);
    }
  }, [version, id, latest, hash]);

  const { modified, created, ...rest } = meta?.time || {};

  const entries = Object.entries(rest);
  entries.sort(
    ([, a], [, b]) =>
      new Date(b as string).getTime() - new Date(a as string).getTime()
  );

  return (
    <select
      style={{ margin: 10 }}
      value={version}
      onChange={(e) =>
        navigate(`/package/${id}/v/${e.target.value}${hash || ""}`)
      }
    >
      {entries.map(([version]) => (
        <option key={version}>{version}</option>
      ))}
    </select>
  );
};
