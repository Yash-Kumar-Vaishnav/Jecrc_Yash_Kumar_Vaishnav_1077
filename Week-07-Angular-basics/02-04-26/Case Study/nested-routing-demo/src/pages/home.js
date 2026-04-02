import React from 'react';

function Home() {
  return (
    <div style={styles.container}>
      <h1>🏠 Home Page</h1>
      <p>Welcome to the Home Page of our React Router Demo Application!</p>
      <p>This is the home page users lands first.</p>
    </div>
  );
}
const styles = {
  container: {
    padding: "40px",
    textAlign: "center",
    backgroundColor: "#cce5ff",
  },
};

export default Home;