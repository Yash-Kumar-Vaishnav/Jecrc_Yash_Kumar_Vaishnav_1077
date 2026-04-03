import { useState } from 'react';
import { useEmployees } from '../contexts/EmployeeContext';
import EmployeeList from './EmployeeList';
import EmployeeForm from './EmployeeForm';
import './Dashboard.css';

const AdminDashboard = () => {
  const [showForm, setShowForm] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const { loading } = useEmployees();

  const handleAdd = () => {
    setEditingEmployee(null);
    setShowForm(true);
  };

  const handleEdit = (id) => {
    setEditingEmployee(id);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingEmployee(null);
  };

  return (
    <div className="dashboard">
      <h2>Admin Dashboard</h2>
      <button onClick={handleAdd} disabled={loading}>Add Employee</button>
      {loading && <div className="loading">Loading...</div>}
      <EmployeeList onEdit={handleEdit} />
      {showForm && (
        <EmployeeForm
          employeeId={editingEmployee}
          onClose={handleCloseForm}
        />
      )}
    </div>
  );
};

export default AdminDashboard;