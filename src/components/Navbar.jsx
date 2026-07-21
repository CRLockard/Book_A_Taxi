import { NavLink } from "react-router-dom";
import "../styles/Navbar.css";
export default function Navbar() {
  return (
    <nav className="navbar">
      <h2>🚖 Book_A_Taxi</h2>
      <div>
        {["/", "/about", "/services", "/booking", "/contact"].map((p, i) => (
          <NavLink key={p} to={p}>
            {["Home", "About", "Services", "Book Ride", "Contact"][i]}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
