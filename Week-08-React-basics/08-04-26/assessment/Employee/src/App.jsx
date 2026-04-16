import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from './redux/slices/authSlice';
import { toggleTheme, setLoading } from './redux/slices/uiSlice';
import Login from './components/Login';
import EmployeeList from './components/EmployeeList';
import EmployeeForm from './components/EmployeeForm';
import './App.css';

function App() {
  const auth = useSelector((state) => state.auth);
  const ui = useSelector((state) => state.ui);
  const dispatch = useDispatch();
  
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const isAuthenticated = auth?.isAuthenticated || false;
  const theme = ui?.theme || 'light';
  const loading = ui?.loading || false;

  const handleEdit = (employee) => {
    setEditingEmployee(employee);
    setShowForm(true);
  };

  const handleAdd = () => {
    setEditingEmployee(null);
    setShowForm(true);
  };

  const handleSave = () => {
    setShowForm(false);
    setEditingEmployee(null);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingEmployee(null);
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleToggleTheme = () => {
    dispatch(toggleTheme());
  };

  return (
    <div className={`app ${theme}`}>
      {loading && <div className="spinner">Loading...</div>}
      {!isAuthenticated ? (
        <Login />
      ) : (
        <div>
          <header>
            <h1>Employee Management System</h1>
            <div className="header-buttons">
              <button onClick={handleToggleTheme} className="btn-theme">🌙 Toggle Theme</button>
              <button onClick={handleLogout} className="btn-logout">Logout</button>
            </div>
          </header>
          <main>
            <button onClick={handleAdd} className="btn-add">➕ Add Employee</button>
            <EmployeeList onEdit={handleEdit} />
            {showForm && (
              <EmployeeForm
                employee={editingEmployee}
                onSave={handleSave}
                onCancel={handleCancel}
              />
            )}
          </main>
        </div>
      )}
    </div>
  );
}

export default App;
