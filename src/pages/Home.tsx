import { Link } from "react-router-dom";

export const Home = () => {
  return (
    <>
      <h1>home..</h1>

      <nav>
        <Link to="/package/crypto-js">crypto-js</Link>

        <Link to="/package/@mcap/core">@mcap/core</Link>

        <Link to="/package/@bbc/psammead-styles">@bbc/psammead-styles</Link>

        <Link to="/package/@bbc/psammead-styles/v/8.1.1">
          @bbc/psammead-styles/v/8.1.1
        </Link>
      </nav>
    </>
  );
};
