import "./App.css";
import { PackageOld } from "./pages/PackageOld";
import { Package2 } from "./pages/Package2";
import { Package } from "./pages/Package";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { RecoilRoot } from "recoil";
import { Boundary } from "./util/Boundary";
import { PackageStyled } from "./pages/PackageStyled";

const paths = [
  "package/:name",
  "package/:name/v/:version",
  "package/@:scope/:name",
  "package/@:scope/:name/v/:version",
  "dev-:scope-:name-:version",
];

function App() {
  return (
    <BrowserRouter>
      <RecoilRoot>
        <Routes>
          {paths.map((path) => (
            <Route key={path} path={path} element={<Package />} />
          ))}
          <Route path="*" element={<Home />} />
        </Routes>
      </RecoilRoot>
    </BrowserRouter>
  );
}

export default App;
