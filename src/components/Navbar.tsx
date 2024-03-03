import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul className="list">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/history">History page</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
