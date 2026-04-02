import {NavLink} from "react-router-dom";

function Navbar() { 
  return (
    <nav style={styles.nav}>
      <h2 style={styles.logo}>My App</h2>

      <div>
        <NavLink to="/" style={styles.link} end>🏠 Home</NavLink>
        <NavLink to="/about" style={styles.link}>ℹ️ About</NavLink>
        <NavLink to="/contact" style={styles.link}>📞 Contact</NavLink>
      </div>
    </nav>
  );
}
const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px 40px",
    color: "#fff",
    backgroundColor: "#2e7c81da",
  },
  logo: {
    color: "#fff",
    margin: 0,
  },
  link: ({isActive}) => ({
    marginLeft: "0px 10px",
    color: isActive ? "#2e5683" : "#fff",
    textDecoration: "none",
    fontSize: "18px",
    fontWeight: isActive ? "bold" : "normal",
  }),
};

export default Navbar;