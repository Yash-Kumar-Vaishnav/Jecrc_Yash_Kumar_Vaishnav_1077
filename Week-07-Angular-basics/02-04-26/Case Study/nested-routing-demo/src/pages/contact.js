import React from 'react';

function Contact() {
  return (
    <div style={styles.container}>
      <h1>📞 Contact Page</h1>
      <p>Feel free to reach out to us at:</p>
      <p>Email:
        <a href="mailto:Support@example.com">Support@example.com</a>
      </p>
      <p>Phone: +91 98765 43210</p>
    </div>
  );
}

const styles = {
  container: {
    padding: "40px",
    textAlign: "center",
    backgroundColor: "#d4edda",
  },
}

export default Contact;