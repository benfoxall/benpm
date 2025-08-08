import "./App.css";

import { lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const Package = lazy(() => import("./pages/Package"));
const Home = lazy(() => import("./pages/Home"));

import { Boundary } from "./util/Boundary";

const paths = [
  "package/:name",
  "package/:name/v/:version",
  "package/@:scope/:name",
  "package/@:scope/:name/v/:version",
];

function App() {
  return (
    <BrowserRouter>
      <Boundary>
        <Routes>
          {paths.map((path) => (
            <Route key={path} path={path} element={<Package />} />
          ))}
          <Route path="*" element={<Home />} />
        </Routes>
      </Boundary>
    </BrowserRouter>
  );
}

export default App;
