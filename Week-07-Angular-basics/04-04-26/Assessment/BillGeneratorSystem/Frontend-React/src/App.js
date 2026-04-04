import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import BillGenerator from './pages/BillGenerator';
import BillHistory from './pages/BillHistory';
import CatalogManager from './pages/CatalogManager';
import Reports from './pages/Reports';
import { useBillStore } from './store/billStore';
import './App.css';
import { Toaster } from 'react-hot-toast';

function App() {
  const { loadCatalogs } = useBillStore();

  useEffect(() => {
    loadCatalogs();
  }, [loadCatalogs]);

  return (
    <Router>
      <div className="app">
        
        {/* 🔥 Navbar */}
        <Navbar />

        {/* 🚀 Main Content */}
        <main className="app-container">
          <div className="content-wrapper">
            <Routes>
              <Route path="/" element={<BillGenerator />} />
              <Route path="/history" element={<BillHistory />} />
              <Route path="/catalog" element={<CatalogManager />} />
              <Route path="/reports" element={<Reports />} />
            </Routes>
          </div>
        </main>

        {/* 🔔 Toast */}
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              borderRadius: '10px',
              background: '#333',
              color: '#fff',
            },
          }}
        />
      </div>
    </Router>
  );
}

export default App;