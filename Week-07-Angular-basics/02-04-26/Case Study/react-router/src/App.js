import { BrowserRouter ,Routes, Route, NavLink } from 'react-router-dom';
import Home from './pages/home';
import About from './pages/about';
import Contact from './pages/contact';

function App() {
  return (
    <BrowserRouter>
      <nav style={styles.nav}>
        <NavLink to="/" style={styles.link} end>🏠 Home</NavLink>
        <NavLink to="/about" style={styles.link}>📄 About</NavLink>
        <NavLink to="/contact" style={styles.link}>📞 Contact</NavLink>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </BrowserRouter>
  );
}

const styles = {
  nav: {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    padding: "15px",
    backgroundColor: "#0a69d6da",
  },
  link: ({isActive}) => ({
    color: isActive ? "#2e5683" : "#fff",
    textDecoration: "none",
    fontSize: "18px",
    fontWeight: isActive ? "bold" : "normal",
  }),
};

export default App;
