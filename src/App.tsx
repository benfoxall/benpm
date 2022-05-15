import "./App.css";
import { PackageOld } from "./pages/PackageOld";
import { Package2 } from "./pages/Package2";
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
];

function App() {
  return (
    <BrowserRouter>
      <RecoilRoot>
        <Boundary>
          <Routes>
            <Route path="foo" element={<PackageStyled />}></Route>
            {paths.map((path) => (
              <Route key={path} path={path} element={<Package2 />}></Route>
            ))}
            <Route path="*" element={<Home />}></Route>
          </Routes>
        </Boundary>
      </RecoilRoot>
    </BrowserRouter>
  );
}

export default App;
