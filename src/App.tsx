import "./App.css";
import { PackagePage } from "./pages/Package";
import { HashRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { RecoilRoot } from "recoil";
import { Boundary } from "./util/Boundary";

function App() {
  return (
    <HashRouter>
      <RecoilRoot>
        <div className="App">
          <Boundary>
            <Routes>
              <Route path="package/*" element={<PackagePage />}></Route>
              <Route path="*" element={<Home />}></Route>
            </Routes>
          </Boundary>
        </div>
      </RecoilRoot>
    </HashRouter>
  );
}

export default App;
