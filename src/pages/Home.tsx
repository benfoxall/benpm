import { Link } from "react-router-dom";

export const Home = () => {
  return (
    <>
      <h1>NPMLS</h1>

      <nav>
        {/* https://registry.npmjs.org/chalk/-/chalk-5.0.1.tgz */}
        {/* <Tarball src="https://registry.npmjs.org/chalk/-/chalk-5.0.1.tgz" /> */}
        {/* <Tarball src="https://registry.npmjs.org/@polymer/polymer/-/polymer-3.4.1.tgz" /> */}

        <Link to="/package/lodash">lodash</Link>
        <Link to="/package/chalk">chalk</Link>
        <Link to="/package/react">react</Link>
        <Link to="/package/@babel/runtime">@babel/runtime</Link>
        <Link to="/package/@polymer/polymer">@polymer/polymer</Link>
        <Link to="/package/@polymer/polymer/v/2.0.0">
          @polymer/polymer/v/2.0.0
        </Link>
      </nav>
    </>
  );
};
