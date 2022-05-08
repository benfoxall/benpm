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
          <header>
            <h1>
              npm<strong>ls</strong>
            </h1>
          </header>

          <hr />
          <main>
            <Boundary>
              <Routes>
                <Route path="package/*" element={<PackagePage />}></Route>
                <Route path="*" element={<Home />}></Route>
              </Routes>
            </Boundary>
          </main>
        </div>
      </RecoilRoot>
    </BrowserRouter>
  );
}

export default App;
