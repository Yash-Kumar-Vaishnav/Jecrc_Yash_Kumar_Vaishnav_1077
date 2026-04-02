import Navbar from './navbar';
import { Outlet } from 'react-router-dom';


function Layout() {
  return (
    <>
    <Navbar/>
    <div style={styles.container}>
      <Outlet />
    </div>
    </>
    
  );
}

const styles = {
  container: {
    padding: "10px",
    textAlign: "center",  
    backgroundColor: "#2f89ff",
  },
}

export default Layout;

