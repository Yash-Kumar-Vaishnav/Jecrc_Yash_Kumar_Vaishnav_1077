import './App.css';
import Layout from './components/Layout';
import { BrowserRouter ,Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import About from './pages/about';
import Contact from './pages/contact';

function App() {
  return (
    <BrowserRouter>
      <div className="App" style={styles.container}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

const styles = {
  container: {
    padding: "5px",
    textAlign: "center",  
    backgroundColor: "#2f89ff",
    gap: "20px",
  },
}

export default App;
