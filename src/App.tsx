import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { Package } from "./pages/Package";
import { RecoilRoot } from "recoil";

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
