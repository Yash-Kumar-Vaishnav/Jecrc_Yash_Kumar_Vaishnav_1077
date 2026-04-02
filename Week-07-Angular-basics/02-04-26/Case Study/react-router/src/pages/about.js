import React from "react";

function About() {
  return (
    <div style={styles.container}>
      <h1>📄 About Page</h1>
      <p>
        This Application Demonstrate the use of React Router Concepts.
      </p>
      <p>It Includes navigation, Routing, and Component Rendering.</p>
    </div>
  );
}

const styles = {
  container: {
    padding: "20px",
    textAlign: "center",  
    backgroundColor: "#faefcd",
  },
}

export default About;