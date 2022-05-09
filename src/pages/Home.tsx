import { Link } from "react-router-dom";

export const Home = () => {
  return (
    <>
      <h1>home..</h1>

      <nav>
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
