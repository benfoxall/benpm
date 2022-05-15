import { Link } from "react-router-dom";

export const Home = () => {
  return (
    <>
      <h1>NPMLS</h1>

      <nav>
        {/* https://registry.npmjs.org/chalk/-/chalk-5.0.1.tgz */}
        {/* <Tarball src="https://registry.npmjs.org/chalk/-/chalk-5.0.1.tgz" /> */}
        {/* <Tarball src="https://registry.npmjs.org/@polymer/polymer/-/polymer-3.4.1.tgz" /> */}

        <Link to="/package/lodash#a/b/c.js">lodash</Link>
        <Link to="/package/chalk#a/b/c.js">chalk</Link>
        <Link to="/package/react#a/b/c.js">react</Link>
        <Link to="/package/@babel/runtime#a/b/c.js">@babel/runtime</Link>
        <Link to="/package/@polymer/polymer#a/b/c.js">@polymer/polymer</Link>
        <Link to="/package/@polymer/polymer/v/2.0.0#a/b/c.js">
          @polymer/polymer/v/2.0.0
        </Link>
      </nav>
    </>
  );
};
