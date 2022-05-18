import { Link } from "react-router-dom";
export default function Nav() {
  console.log("something");
  return (
    <nav>
      <Link to="/">
        <h2>Menu</h2>
      </Link>

      <ul>
        {/* TODO: Make these links */}
        <Link to="/">
          <li>Contacts List</li>
        </Link>
        <li>
          <Link to="/add">Add New Contact</Link>
        </li>
      </ul>
    </nav>
  );
}
