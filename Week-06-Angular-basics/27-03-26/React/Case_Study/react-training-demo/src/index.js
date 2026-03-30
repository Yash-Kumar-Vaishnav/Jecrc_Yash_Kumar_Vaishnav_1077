import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';


// function App() {
//   return (
//     <div className="App">
//       <h1>Hello,Welcome to React Training!</h1>
//       <p>This is rendered by react , not by vanilla JavaScript!.</p>
//     </div>
//   );
// }

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
reportWebVitals();