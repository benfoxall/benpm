import "./App.css";
import { PackagePage } from "./pages/Package";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { RecoilRoot } from "recoil";
import { Boundary } from "./util/Boundary";

function App() {
  return (
    <BrowserRouter>
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
    </BrowserRouter>
  );
}

export default App;
